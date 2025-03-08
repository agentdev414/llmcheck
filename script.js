document.addEventListener('DOMContentLoaded', () => {
    const comparisonTable = document.getElementById('comparison-table');

    // LLMデータの定義
    const llmData = [
        { name: 'GPT-4', accuracy: 95, speed: '高速', cost: '高' },
        { name: 'Claude 3 Opus', accuracy: 96, speed: '高速', cost: '高' },
        { name: 'Gemini 1.5 Pro', accuracy: 94, speed: '中速', cost: '中' },
        { name: 'GPT-3.5', accuracy: 90, speed: '高速', cost: '低' }
    ];

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
    llmData.forEach(model => {
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
});