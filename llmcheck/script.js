document.addEventListener('DOMContentLoaded', () => {
    const comparisonTable = document.getElementById('comparison-table');

    // ランキングサイトのAPI URL
    const apiUrl = 'https://example.com/api/llm_ranking?callback=displayRanking'; // 実際にはAPIが存在しないため、エラーが発生します

    // JSONPでデータを取得
    const script = document.createElement('script');
    script.src = apiUrl;
    document.body.appendChild(script);

    // コールバック関数
    window.displayRanking = (data) => {
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
    };
});