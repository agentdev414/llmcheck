document.addEventListener('DOMContentLoaded', () => {
    const comparisonTable = document.getElementById('comparison-table');

    // SupabaseのURLとAPIキー
    const supabaseUrl = '${{ secrets.SUPABASE_URL }}';
    const supabaseKey = '${{ secrets.SUPABASE_KEY }}';

    // Supabaseクライアントの初期化
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    // Supabaseからデータを取得
    async function getRankingData() {
        const { data, error } = await supabase
            .from('llm_ranking') // テーブル名を指定
            .select('*'); // 取得するカラムを指定

        if (error) {
            console.error('Error fetching data from Supabase:', error);
            comparisonTable.innerHTML = '<p>データの取得に失敗しました。</p>';
        } else {
            // グラフの作成
            const chartData = {
                labels: data.map(item => item.model_name),
                datasets: [{
                    label: '精度 (%)',
                    data: data.map(item => item.accuracy),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            };

            const chartConfig = {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            };

            // グラフを表示するCanvas要素を作成
            const chartCanvas = document.createElement('canvas');
            comparisonTable.appendChild(chartCanvas);

            // Chart.jsを使用してグラフを作成
            const chart = new Chart(chartCanvas, chartConfig);
        }
    }

    // データの取得とグラフの表示
    getRankingData();
});