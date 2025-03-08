document.addEventListener('DOMContentLoaded', () => {
    const comparisonTable = document.getElementById('comparison-table');

    // ランキングサイトのAPI URL
    const apiUrl = 'https://example.com/api/llm_ranking'; // 実際にはAPIが存在しないため、エラーが発生します

    // APIからデータを取得
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // テーブルの作成
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>モデル</th>
                        <th>精度 (%)</th>
                        <th>速度</th>
                        <th>コスト</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;

            const tbody = table.querySelector('tbody');

            // LLMデータを行に追加
            data.forEach(model => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${model.name}</td>
                    <td>${model.accuracy}</td>
                    <td>${model.speed}</td>
                    <td>${model.cost}</td>
                `;
                tbody.appendChild(row);
            });

            // テーブルをDOMに追加
            comparisonTable.appendChild(table);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            comparisonTable.innerHTML = '<p>データの取得に失敗しました。</p>';
        });
});