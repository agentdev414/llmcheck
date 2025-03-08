document.addEventListener('DOMContentLoaded', () => {
    const comparisonTable = document.getElementById('comparison-table');

    // SupabaseのURLとAPIキー
    const supabaseUrl = '${{ secrets.SUPABASE_URL }}' || 'https://yzagxfztfehptcgjfilc.supabase.co'; // ローカルテスト用
    const supabaseKey = '${{ secrets.SUPABASE_KEY }}' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6YWd4Znp0ZmVocHRjZ2pmaWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MTI4NDEsImV4cCI6MjA1Njk4ODg0MX0.XOixQrxk82xnlYqz24SCP38LXAe1JxT7Opzl00s1fbA'; // ローカルテスト用

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