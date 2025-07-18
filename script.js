document.addEventListener('DOMContentLoaded', () => {
    const lookupBtn = document.getElementById('lookup-btn');
    const postalCodeInput = document.getElementById('postal-code');
    const addressInput = document.getElementById('address');

    lookupBtn.addEventListener('click', async () => {
        const postalCode = postalCodeInput.value;
        if (!postalCode) {
            alert('郵便番号を入力してください。');
            return;
        }

        // APIエンドポイント
        const apiUrl = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 200 && data.results) {
                const result = data.results[0];
                // 都道府県、市区町村、町域名を結合して住所欄に設定
                addressInput.value = result.address1 + result.address2 + result.address3;
            } else {
                alert('該当する住所が見つかりませんでした。郵便番号を確認してください。');
            }
        } catch (error) {
            console.error('住所の取得に失敗しました:', error);
            alert('住所の取得中にエラーが発生しました。しばらくしてから再度お試しください。');
        }
    });

    // フォーム送信時の処理（実際にはここでサーバーにデータを送信します）
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault(); // フォームのデフォルトの送信をキャンセル
        alert('ご注文ありがとうございます！\n（これはデモです。実際の注文は送信されません）');
        
        // ここでフォームのデータをサーバーに送信する処理を実装します。
        // 例: const formData = new FormData(orderForm);
        //     fetch('/api/order', { method: 'POST', body: formData });
    });
});
