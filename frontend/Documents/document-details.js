const token = localStorage.getItem('token');
        
        const params = new URLSearchParams(window.location.search);
        const documentId = params.get('id');
        const applicationId = params.get('applicationId');
        
        const typeMap = {
            APPLICATION: "Заявка",
            PAYMENT_RECEIPT: "Чек об оплате",
            TOUR_VOUCHER: "Туристский ваучер",
            SERVICE_CONTRACT: "Договор",
            TOURIST_MEMO: "Туристическая путевка"
        };
        
        async function fetchDocumentDetails() {
            if (!documentId) {
                document.getElementById('docContent').innerHTML = '<div class="error">ID документа не указан</div>';
                document.getElementById('docTitle').textContent = 'Ошибка';
                return;
            }
            
            try {
                const res = await fetch(`http://localhost:5000/api/documents/${documentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const doc = await res.json();
                
                if (!res.ok) {
                    throw new Error(doc.message || 'Ошибка загрузки');
                }
                
                displayDocumentDetails(doc);
                
            } catch (e) {
                console.error(e);
                document.getElementById('docContent').innerHTML = `<div class="error">Ошибка загрузки документа: ${e.message}</div>`;
                document.getElementById('docTitle').textContent = 'Ошибка';
            }
        }
        
        function displayDocumentDetails(doc) {
            const docType = typeMap[doc.type] || doc.type;
            document.getElementById('docTitle').textContent = docType;
            
            const date = doc.createdAt ? new Date(doc.createdAt).toLocaleString('ru-RU') : '—';
            
            let additionalInfo = '';
            
            // Дополнительная информация в зависимости от типа документа
            switch(doc.type) {
                case 'APPLICATION':
                    additionalInfo = `
                        <div class="info-row">
                            <span class="label">Статус заявки:</span>
                            <span class="value">Создана</span>
                        </div>
                    `;
                    break;
                case 'PAYMENT_RECEIPT':
                    additionalInfo = `
                        <div class="info-row">
                            <span class="label">Сумма:</span>
                            <span class="value">Требуется уточнение</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Статус оплаты:</span>
                            <span class="value">Ожидает подтверждения</span>
                        </div>
                    `;
                    break;
                case 'TOUR_VOUCHER':
                    additionalInfo = `
                        <div class="info-row">
                            <span class="label">Дата тура:</span>
                            <span class="value">Требуется уточнение</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Отель:</span>
                            <span class="value">Требуется уточнение</span>
                        </div>
                    `;
                    break;
            }
            
            document.getElementById('docContent').innerHTML = `
                <div class="info-row">
                    <span class="label">Номер документа:</span>
                    <span class="value"><strong>${doc.number || '—'}</strong></span>
                </div>
                <div class="info-row">
                    <span class="label">Дата создания:</span>
                    <span class="value">${date}</span>
                </div>
                <div class="info-row">
                    <span class="label">Тип документа:</span>
                    <span class="value">${docType}</span>
                </div>
                <div class="info-row">
                    <span class="label">ID заявки:</span>
                    <span class="value">${doc.applicationId || '—'}</span>
                </div>
                ${additionalInfo}
                <div class="info-row">
                    <span class="label">ID документа:</span>
                    <span class="value">${doc._id || '—'}</span>
                </div>
            `;
        }
        
        function goBack() {
            if (applicationId) {
                window.location.href = `./documents.html?applicationId=${applicationId}`;
            } else {
                window.history.back();
            }
        }
        
        function printDocument() {
            window.print();
        }
        
        fetchDocumentDetails();