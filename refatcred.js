// ==UserScript==
// @name         Planilha Refat Credito
// @namespace    https://sistemas.caesb/gcom/
// @version      1.0
// @description  Apresenta uma tela com opções para cálculos de refaturamento de crédito
// @match        *sistemas.caesb.df.gov.br/gcom/*
// @match        *sistemas.caesb/gcom/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    console.log("Script carregado");

    const tabela = [
        { categoria: 'Residencial', tarifacao: '06/2021', faixa: 7, valor: 2.98 },
        { categoria: 'Residencial', tarifacao: '06/2021', faixa: 13, valor: 3.57 },
        { categoria: 'Residencial', tarifacao: '06/2021', faixa: 20, valor: 7.07 },
        { categoria: 'Residencial', tarifacao: '06/2021', faixa: 30, valor: 10.25 },
        { categoria: 'Residencial', tarifacao: '06/2021', faixa: 45, valor: 15.37 },
        { categoria: 'Residencial', tarifacao: '06/2021', faixa: 10000, valor: 19.99 },
        { categoria: 'Social', tarifacao: '06/2021', faixa: 7, valor: 1.49 },
        { categoria: 'Social', tarifacao: '06/2021', faixa: 13, valor: 1.78 },
        { categoria: 'Social', tarifacao: '06/2021', faixa: 20, valor: 3.53 },
        { categoria: 'Social', tarifacao: '06/2021', faixa: 30, valor: 5.12 },
        { categoria: 'Social', tarifacao: '06/2021', faixa: 45, valor: 15.37 },
        { categoria: 'Social', tarifacao: '06/2021', faixa: 10000, valor: 19.99 },
        { categoria: 'Comercial', tarifacao: '06/2021', faixa: 4, valor: 6.26 },
        { categoria: 'Comercial', tarifacao: '06/2021', faixa: 7, valor: 7.82 },
        { categoria: 'Comercial', tarifacao: '06/2021', faixa: 10, valor: 10.09 },
        { categoria: 'Comercial', tarifacao: '06/2021', faixa: 40, valor: 12.51 },
        { categoria: 'Comercial', tarifacao: '06/2021', faixa: 10000, valor: 14.77 },
        { categoria: 'Residencial', tarifacao: '09/2022', faixa: 7, valor: 2.97 },
        { categoria: 'Residencial', tarifacao: '09/2022', faixa: 13, valor: 3.56 },
        { categoria: 'Residencial', tarifacao: '09/2022', faixa: 20, valor: 7.05 },
        { categoria: 'Residencial', tarifacao: '09/2022', faixa: 30, valor: 10.23 },
        { categoria: 'Residencial', tarifacao: '09/2022', faixa: 45, valor: 15.34 },
        { categoria: 'Residencial', tarifacao: '09/2022', faixa: 10000, valor: 19.94 },
        { categoria: 'Social', tarifacao: '09/2022', faixa: 7, valor: 1.48 },
        { categoria: 'Social', tarifacao: '09/2022', faixa: 13, valor: 1.78 },
        { categoria: 'Social', tarifacao: '09/2022', faixa: 20, valor: 3.53 },
        { categoria: 'Social', tarifacao: '09/2022', faixa: 30, valor: 5.11 },
        { categoria: 'Social', tarifacao: '09/2022', faixa: 45, valor: 15.34 },
        { categoria: 'Social', tarifacao: '09/2022', faixa: 10000, valor: 19.94 },
        { categoria: 'Comercial', tarifacao: '09/2022', faixa: 4, valor: 6.24 },
        { categoria: 'Comercial', tarifacao: '09/2022', faixa: 7, valor: 7.81 },
        { categoria: 'Comercial', tarifacao: '09/2022', faixa: 10, valor: 10.07 },
        { categoria: 'Comercial', tarifacao: '09/2022', faixa: 40, valor: 12.49 },
        { categoria: 'Comercial', tarifacao: '09/2022', faixa: 10000, valor: 14.73 },
        { categoria: 'Residencial', tarifacao: '01/2023', faixa: 7, valor: 3.26 },
        { categoria: 'Residencial', tarifacao: '01/2023', faixa: 13, valor: 3.91 },
        { categoria: 'Residencial', tarifacao: '01/2023', faixa: 20, valor: 7.75 },
        { categoria: 'Residencial', tarifacao: '01/2023', faixa: 30, valor: 11.24 },
        { categoria: 'Residencial', tarifacao: '01/2023', faixa: 45, valor: 16.86 },
        { categoria: 'Residencial', tarifacao: '01/2023', faixa: 10000, valor: 21.91 },
        { categoria: 'Social', tarifacao: '01/2023', faixa: 7, valor: 1.63 },
        { categoria: 'Social', tarifacao: '01/2023', faixa: 13, valor: 1.96 },
        { categoria: 'Social', tarifacao: '01/2023', faixa: 20, valor: 3.88 },
        { categoria: 'Social', tarifacao: '01/2023', faixa: 30, valor: 5.62 },
        { categoria: 'Social', tarifacao: '01/2023', faixa: 45, valor: 16.86 },
        { categoria: 'Social', tarifacao: '01/2023', faixa: 10000, valor: 21.91 },
        { categoria: 'Comercial', tarifacao: '01/2023', faixa: 4, valor: 6.72 },
        { categoria: 'Comercial', tarifacao: '01/2023', faixa: 7, valor: 8.41 },
        { categoria: 'Comercial', tarifacao: '01/2023', faixa: 10, valor: 10.84 },
        { categoria: 'Comercial', tarifacao: '01/2023', faixa: 40, valor: 13.45 },
        { categoria: 'Comercial', tarifacao: '01/2023', faixa: 10000, valor: 15.86 },
        { categoria: 'Residencial', tarifacao: '08/2023', faixa: 7, valor: 3.42 },
        { categoria: 'Residencial', tarifacao: '08/2023', faixa: 13, valor: 4.11 },
        { categoria: 'Residencial', tarifacao: '08/2023', faixa: 20, valor: 8.14 },
        { categoria: 'Residencial', tarifacao: '08/2023', faixa: 30, valor: 11.8 },
        { categoria: 'Residencial', tarifacao: '08/2023', faixa: 45, valor: 17.7 },
        { categoria: 'Residencial', tarifacao: '08/2023', faixa: 10000, valor: 23.01 },
        { categoria: 'Social', tarifacao: '08/2023', faixa: 7, valor: 1.71 },
        { categoria: 'Social', tarifacao: '08/2023', faixa: 13, valor: 2.06 },
        { categoria: 'Social', tarifacao: '08/2023', faixa: 20, valor: 4.07 },
        { categoria: 'Social', tarifacao: '08/2023', faixa: 30, valor: 5.9 },
        { categoria: 'Social', tarifacao: '08/2023', faixa: 45, valor: 17.7 },
        { categoria: 'Social', tarifacao: '08/2023', faixa: 10000, valor: 23.01 },
        { categoria: 'Comercial', tarifacao: '08/2023', faixa: 4, valor: 7.07 },
        { categoria: 'Comercial', tarifacao: '08/2023', faixa: 7, valor: 8.83 },
        { categoria: 'Comercial', tarifacao: '08/2023', faixa: 10, valor: 11.39 },
        { categoria: 'Comercial', tarifacao: '08/2023', faixa: 40, valor: 14.12 },
        { categoria: 'Comercial', tarifacao: '08/2023', faixa: 10000, valor: 16.66 },
        { categoria: 'Residencial', tarifacao: '06/2024', faixa: 7, valor: 3.76 },
        { categoria: 'Residencial', tarifacao: '06/2024', faixa: 13, valor: 4.51 },
        { categoria: 'Residencial', tarifacao: '06/2024', faixa: 20, valor: 8.94 },
        { categoria: 'Residencial', tarifacao: '06/2024', faixa: 30, valor: 12.97 },
        { categoria: 'Residencial', tarifacao: '06/2024', faixa: 45, valor: 19.45 },
        { categoria: 'Residencial', tarifacao: '06/2024', faixa: 10000, valor: 25.28 },
        { categoria: 'Social', tarifacao: '06/2024', faixa: 7, valor: 1.88 },
        { categoria: 'Social', tarifacao: '06/2024', faixa: 13, valor: 2.26 },
        { categoria: 'Social', tarifacao: '06/2024', faixa: 20, valor: 4.48 },
        { categoria: 'Social', tarifacao: '06/2024', faixa: 30, valor: 6.48 },
        { categoria: 'Social', tarifacao: '06/2024', faixa: 45, valor: 19.45 },
        { categoria: 'Social', tarifacao: '06/2024', faixa: 10000, valor: 25.28 },
        { categoria: 'Comercial', tarifacao: '06/2024', faixa: 4, valor: 7.76 },
        { categoria: 'Comercial', tarifacao: '06/2024', faixa: 7, valor: 9.7 },
        { categoria: 'Comercial', tarifacao: '06/2024', faixa: 10, valor: 12.52 },
        { categoria: 'Comercial', tarifacao: '06/2024', faixa: 40, valor: 15.52 },
        { categoria: 'Comercial', tarifacao: '06/2024', faixa: 10000, valor: 18.31 },
        { categoria: 'Residencial', tarifacao: '06/2025', faixa: 7, valor: 4.13 },
        { categoria: 'Residencial', tarifacao: '06/2025', faixa: 13, valor: 4.96 },
        { categoria: 'Residencial', tarifacao: '06/2025', faixa: 20, valor: 9.82 },
        { categoria: 'Residencial', tarifacao: '06/2025', faixa: 30, valor: 14.25 },
        { categoria: 'Residencial', tarifacao: '06/2025', faixa: 45, valor: 21.37 },
        { categoria: 'Residencial', tarifacao: '06/2025', faixa: 10000, valor: 27.77 },
        { categoria: 'Social', tarifacao: '06/2025', faixa: 7, valor: 2.07 },
        { categoria: 'Social', tarifacao: '06/2025', faixa: 13, valor: 2.48 },
        { categoria: 'Social', tarifacao: '06/2025', faixa: 20, valor: 4.92 },
        { categoria: 'Social', tarifacao: '06/2025', faixa: 30, valor: 7.12 },
        { categoria: 'Social', tarifacao: '06/2025', faixa: 45, valor: 21.37 },
        { categoria: 'Social', tarifacao: '06/2025', faixa: 10000, valor: 27.77 },
        { categoria: 'Comercial', tarifacao: '06/2025', faixa: 4, valor: 8.53 },
        { categoria: 'Comercial', tarifacao: '06/2025', faixa: 7, valor: 10.66 },
        { categoria: 'Comercial', tarifacao: '06/2025', faixa: 10, valor: 13.75 },
        { categoria: 'Comercial', tarifacao: '06/2025', faixa: 40, valor: 17.05 },
        { categoria: 'Comercial', tarifacao: '06/2025', faixa: 10000, valor: 20.12 }
    ];

    function createOptionsWindow() {
        console.log("Criando janela de opções");
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '30px';
        container.style.left = '30px';
        container.style.padding = '15px';
        container.style.backgroundColor = '#f9f9f9';
        container.style.border = '1px solid #ccc';
        container.style.borderRadius = '8px';
        container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        container.style.zIndex = '10000';
        container.style.width = '180px';
        container.style.display = 'none';
        container.style.textAlign = 'center'; // Alinha o texto ao centro

        const titleBar = document.createElement('div');
        titleBar.style.backgroundColor = '#007bff';
        titleBar.style.color = 'white';
        titleBar.style.padding = '1px';
        titleBar.style.borderTopLeftRadius = '1px';
        titleBar.style.borderTopRightRadius = '1px';
        titleBar.style.marginBottom = '6px';
        titleBar.style.cursor = 'pointer';
        titleBar.textContent = 'Refaturamento';
        titleBar.addEventListener('click', () => {
            container.style.display = 'none';
        });

        container.appendChild(titleBar);

        const content = document.createElement('div');
        content.style.padding = '6px';

        const fields = [
            { label: 'Categoria', id: 'categoria', type: 'select', options: ['Residencial', 'Comercial', 'Social'], default: 'Residencial' },
            { label: 'Esgoto', id: 'esgoto', type: 'select', options: [100, 60, 50, 0], default: 100 },
            { label: 'Tipo de Vazamento', id: 'tipoVazamento', type: 'select', options: ['Interno', 'Depois do Hidrômetro'], default: 'Interno' },
            { label: 'OSC', id: 'osc', type: 'text' },
            { label: 'Unidades de Consumo', id: 'unidadesConsumo', type: 'text' },
            { label: 'Conta ref', id: 'contaRef', type: 'text' },
            { label: 'Consumo', id: 'consumo', type: 'text' },
            { label: 'LS', id: 'ls', type: 'text' },
            { label: 'Média', id: 'media', type: 'text' },
            { label: 'Tarifação', id: 'tarifacao', type: 'select', options: ['06/2025', '06/2024', '08/2023', '01/2023', '09/2022', '06/2021'], default: '06/2024' }
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;
            label.style.display = 'block';
            label.style.marginBottom = '0px';
            label.style.fontSize = '11px';
            container.appendChild(label);

            let input;
            if (field.type === 'select') {
                input = document.createElement('select');
                field.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    input.appendChild(opt);
                });
                input.value = field.default;
                input.style.marginTop = '0px';
                input.style.marginBottom = '0px';
            } else {
                input = document.createElement('input');
                input.type = field.type;
                input.id = field.id;
            }
            input.id = field.id;
            input.style.width = '100%';
            input.style.fontSize = '11px';
            container.appendChild(input);

            // Carregar valor do localStorage
            const savedValue = localStorage.getItem(field.id);
            if (savedValue) {
                input.value = savedValue;
            }

            // Salvar valor no localStorage ao mudar
            input.addEventListener('change', () => {
                localStorage.setItem(field.id, input.value);
            });
        });

        const button = document.createElement('button');
        button.textContent = 'Calcular';
        button.style.marginTop = '3px';
        button.style.fontSize = '11px';
        button.addEventListener('click', calculate);
        container.appendChild(button);

        const resultContainer = document.createElement('div');
        resultContainer.id = 'resultContainer';
        resultContainer.style.marginTop = '10px';
        resultContainer.style.fontSize = '11px';
        container.appendChild(resultContainer);

        document.body.appendChild(container);
        console.log("Janela de opções criada");

        // Adiciona um ícone para abrir a janela de opções
        const icon = document.createElement('div');
        icon.style.position = 'fixed';
        icon.style.top = '10px';
        icon.style.left = '10px';
        icon.style.width = '30px';
        icon.style.height = '30px';
        icon.style.backgroundColor = '#007bff';
        icon.style.borderRadius = '50%';
        icon.style.cursor = 'pointer';
        icon.style.zIndex = '10001';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.color = 'white';
        icon.textContent = '+';
        icon.addEventListener('click', () => {
            container.style.display = container.style.display === 'none' ? 'block' : 'none';
        });
        document.body.appendChild(icon);
    }

    function calculate() {
        console.log("Calculando valores");
        const categoria = document.getElementById('categoria').value;
        const esgoto = document.getElementById('esgoto').value;
        const tipoVazamento = document.getElementById('tipoVazamento').value;
        const osc = document.getElementById('osc').value;
        const unidadesConsumo = document.getElementById('unidadesConsumo').value;
        const contaRef = document.getElementById('contaRef').value;
        const consumo = document.getElementById('consumo').value;
        const ls = document.getElementById('ls').value;
        const media = document.getElementById('media').value;
        const tarifacao = document.getElementById('tarifacao').value;

        const resultadoAguaMedido = calcValorConta(consumo, categoria, tarifacao, unidadesConsumo, tabela);
        const consumoRefat = tipoVazamento === 'Interno' ? ls : media;
        const resultadoAguaRefat = calcValorConta(consumoRefat, categoria, tarifacao, unidadesConsumo, tabela);
        const resultadoEsgotoMedido = calcValorConta(consumo * esgoto / 100, categoria, tarifacao, unidadesConsumo, tabela);
        const resultadoEsgotoRefat = calcValorConta(media * esgoto / 100, categoria, tarifacao, unidadesConsumo, tabela);

        displayResults(resultadoAguaMedido, resultadoAguaRefat, resultadoEsgotoMedido, resultadoEsgotoRefat, consumo, esgoto, ls, media, consumoRefat, osc, contaRef);
    }

    function calcValorConta(consumo, tipo, data, unidadeConsumo, tabela) {
        let valorConta = 0;
        let consumoAnterior = 0;

        if (tipo === "Comercial") unidadeConsumo = 1;

        for (let i = 0; i < tabela.length; i++) {
            const item = tabela[i];
            if (item.categoria === tipo && item.tarifacao === data) {
                if (consumo <= item.faixa * unidadeConsumo) {
                    valorConta += (consumo - consumoAnterior) * item.valor;
                    return valorConta;
                } else {
                    valorConta += (item.faixa * unidadeConsumo - consumoAnterior) * item.valor;
                    consumoAnterior = item.faixa * unidadeConsumo;
                }
            }
        }

        return valorConta;
    }

    function displayResults(resultadoAguaMedido, resultadoAguaRefat, resultadoEsgotoMedido, resultadoEsgotoRefat, consumo, esgoto, ls, media, consumoRefat, osc, contaRef) {
        const resultContainer = document.getElementById('resultContainer');
        const descontoAgua = Math.max(0, resultadoAguaMedido - resultadoAguaRefat);
        const descontoEsgoto = Math.max(0, resultadoEsgotoMedido - resultadoEsgotoRefat);
    
        resultContainer.innerHTML = `
            <div><strong>Cálculo:</strong></div>
            <div style="display: flex;">
                <table style="width: 50%; border-collapse: collapse; margin-right: 5px; font-size: 11px;">
                    <tr>
                        <td style="padding: 5px;"><strong></strong></td>
                        <td style="padding: 3px; font-size: 11px;"><strong>Água</strong></td>
                        <td style="padding: 3px; font-size: 11px;"><strong>Esgoto</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 3px; font-size: 11px;"><strong>Medido:</strong></td>
                        <td style="padding: 3px; font-size: 11px;">${resultadoAguaMedido.toFixed(2)} (${consumo}m³)</td>
                        <td style="padding: 3px; font-size: 11px;">${resultadoEsgotoMedido.toFixed(2)} (${(consumo * esgoto / 100).toFixed(0)}m³)</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px; font-size: 11px;"><strong>Refat:</strong></td>
                        <td style="padding: 3px; font-size: 11px;">${resultadoAguaRefat.toFixed(2)} (${consumoRefat}m³)</td>
                        <td style="padding: 3px; font-size: 11px;">${resultadoEsgotoRefat.toFixed(2)} (${media}m³)</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px; font-size: 11px;"><strong>Desconto:</strong></td>
                        <td style="padding: 3px; font-size: 11px;">${descontoAgua.toFixed(2)}</td>
                        <td style="padding: 3px; font-size: 11px;">${descontoEsgoto.toFixed(2)}</td>
                    </tr>
                </table>
            </div>
            <div style="margin-top: 10px; font-size: 11px; text-align: left">
                Vazamento Interno conforme OSC ${osc} conta ${contaRef} já paga.<br>
                Refaturamento pelo ${tipoVazamento === 'Interno' && ls < consumo ? 'LS' : 'MÉDIA'}<br>
                Valor de água: ${resultadoAguaMedido.toFixed(2)} (${consumo}m³) - ${resultadoAguaRefat.toFixed(2)} (${consumoRefat}m³) = ${descontoAgua.toFixed(2)}<br>
                Valor de esgoto: ${resultadoEsgotoMedido.toFixed(2)} (${(consumo * esgoto / 100).toFixed(0)}m³) - ${resultadoEsgotoRefat.toFixed(2)} (${media}m³) = ${descontoEsgoto.toFixed(2)}
            </div>
        `;
    }

    createOptionsWindow();
})();
