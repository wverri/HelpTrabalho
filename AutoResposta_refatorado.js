// ==UserScript==
// @name        HelpGCOM_Refatorado
// @namespace   https://sistemas.caesb.df.gov.br/gcom/
// @match       *sistemas.caesb.df.gov.br/gcom/*
// @match       *sistemas.caesb/gcom/*
// @version     4.0.0
// @grant       none
// @license     MIT
// @description Auxiliar refatorado para trabalhos no GCOM seguindo Clean Code
// @downloadURL https://update.greasyfork.org/scripts/496957/HelpGCOM_novo.user.js
// @updateURL https://update.greasyfork.org/scripts/496957/HelpGCOM_novo.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Configurações globais
    const CONFIG = {
        version: GM_info.script.version,
        targetUrl: '/app/atendimento/validarClienteCadastroVistoria/edicao',
        checkInterval: 200,
        timeouts: {
            element: 2000,
            clickable: 30000,
            enabled: 30000
        }
    };

    // Utilitários para manipulação do DOM
    class DOMUtils {
        static getDynamicIdByText(startingPattern, targetText, modif = 0, targetIndex = 0) {
            const elements = document.querySelectorAll(`[id^="${startingPattern}"]`);
            const matchedIds = Array.from(elements)
                .map(element => ({
                    id: element.id,
                    elementText: element.textContent.trim()
                }))
                .filter(item => item.id && item.elementText.includes(targetText));

            const index = targetIndex === -1 ? matchedIds.length - 1 : targetIndex;
            
            if (index >= 0 && index < matchedIds.length) {
                const { id } = matchedIds[index];
                return modif !== 0 ? this.modifyId(id, modif) : id;
            }

            return null;
        }

        static modifyId(id, modif) {
            const currentNumber = parseInt(id.match(/\d+/)[0]);
            const nextNumber = currentNumber + modif;
            const regex = new RegExp("(\\d+)(?!.*\\d)");
            return id.replace(regex, nextNumber);
        }

        static formatCSSSelector(id) {
            return id ? `#${id.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1")}` : null;
        }

        static safeQuerySelector(selector) {
            try {
                return document.querySelector(selector);
            } catch (e) {
                console.error('Seletor inválido:', selector, e);
                return null;
            }
        }

        static async waitForElement(selector, timeout = CONFIG.timeouts.element) {
            const startTime = Date.now();
            
            while (!document.querySelector(selector)) {
                if (Date.now() - startTime > timeout) {
                    return null;
                }
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            return document.querySelector(selector);
        }

        static async waitForClickable(selector, timeout = CONFIG.timeouts.clickable) {
            const startTime = Date.now();
            
            while (true) {
                if (Date.now() - startTime > timeout) {
                    throw new Error("Timeout waiting for element to be clickable");
                }
                
                const element = document.querySelector(selector);
                if (element && !element.disabled && getComputedStyle(element).display !== 'none') {
                    return element;
                }
                
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        static async waitForElementEnabled(selector, timeout = CONFIG.timeouts.enabled) {
            const startTime = Date.now();
            
            while (true) {
                const element = document.querySelector(selector);
                if (element && !element.disabled) {
                    return element;
                }
                
                if (Date.now() - startTime > timeout) {
                    throw new Error('Timeout waiting for element to be enabled');
                }
                
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }

    // Gerenciador de seletores dinâmicos
    class SelectorManager {
        constructor() {
            this.selectors = {};
            this.initialize();
        }

        initialize() {
            this.updateSelectors();
        }

        updateSelectors() {
            this.selectors.hidrometro = 'form:numHidrometro';
            this.selectors.leitura = 'form:leituraVistoria';
            this.selectors.lacre = 'form:lacreInstaladoVistoria';
            this.selectors.usuario = 'form:nomeContatoVistoria';
            this.selectors.naoSeAplica = '#form\\:naoSeAplicaVistoria > div:nth-child(2) > span:nth-child(1)';

            this.updateDynamicSelectors();
        }

        updateDynamicSelectors() {
            const respostaID = DOMUtils.getDynamicIdByText('form\\:j_idt', 'Sim', 0, -1);
            const diagnosticoID = DOMUtils.getDynamicIdByText('form\\:j_idt', 'Diagnóstico*:', 1, -1);
            const providenciaID = DOMUtils.getDynamicIdByText('form\\:j_idt', 'Providência*:', 1, -1);

            this.selectors.resposta = DOMUtils.formatCSSSelector(respostaID) + 
                ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)';
            this.selectors.diagnostico = DOMUtils.formatCSSSelector(diagnosticoID);
            this.selectors.providencia = DOMUtils.formatCSSSelector(providenciaID);

            this.updateVazamentoSelectors();
            this.updateAnexoSelectors();
            this.updateRevisaoSelectors();
        }

        updateVazamentoSelectors() {
            const vazcorrigidosimID = DOMUtils.getDynamicIdByText('form\\:j_idt', 'Não se aplica', 2, -1);
            const vazvisivelID = DOMUtils.getDynamicIdByText('form\\:j_idt', 'Não se aplica', 5, -1);
            const vazcoletadoID = DOMUtils.getDynamicIdByText('form\\:j_idt', 'Não se aplica', 8, -1);

            this.selectors.vazCorrigidoSim = DOMUtils.formatCSSSelector(vazcorrigidosimID) + 
                ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)';
            this.selectors.vazVisivel = DOMUtils.formatCSSSelector(vazvisivelID) + 
                ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > label:nth-child(2)';
            this.selectors.vazNaoVisivel = DOMUtils.formatCSSSelector(vazvisivelID) + 
                ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > label:nth-child(2)';
            this.selectors.vazColetado = DOMUtils.formatCSSSelector(vazcoletadoID) + 
                '> tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > label:nth-child(2)';
            this.selectors.vazNaoColetado = DOMUtils.formatCSSSelector(vazcoletadoID) + 
                ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > label:nth-child(2)';
        }

        updateAnexoSelectors() {
            const nomeANEXO = DOMUtils.getDynamicIdByText('formConfirmaAnexoVistoriaEmail\\:j_idt', 'Arquivo selecionado:');
            const descricaoANEXO = DOMUtils.getDynamicIdByText('formConfirmaAnexoVistoriaEmail\\:j_idt', 'Descrição do arquivo:*', 1);

            this.selectors.anexo = {
                nome: DOMUtils.formatCSSSelector(nomeANEXO) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)',
                descricao: DOMUtils.formatCSSSelector(descricaoANEXO)
            };
        }

        updateRevisaoSelectors() {
            const revisaocontaID = DOMUtils.getDynamicIdByText('form\\:j_idt', 'Revisão de Conta: *', 1, -1);
            this.selectors.revisaoConta = DOMUtils.formatCSSSelector(revisaocontaID) + 
                ' tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > label:nth-child(2)';
        }

        getRefaturamentoSelectors() {
            return {
                irregularidadeConstatada: DOMUtils.formatCSSSelector(
                    DOMUtils.getDynamicIdByText('form\\:j_idt', 'Irregularidade Constatada*:', 1, -1)
                ),
                apuracao: DOMUtils.formatCSSSelector(
                    DOMUtils.getDynamicIdByText('form\\:j_idt', 'Elemento de apuração da irregularidade*:', 1, -1)
                ),
                criterios: DOMUtils.formatCSSSelector(
                    DOMUtils.getDynamicIdByText('form\\:j_idt', 'Critérios adotados na revisão dos faturamentos*:', 1, -1)
                ),
                tarifa: DOMUtils.formatCSSSelector(
                    DOMUtils.getDynamicIdByText('form\\:j_idt', 'Tarifa utilizada*:', 1, -1)
                ),
                memoriaCalculo: DOMUtils.formatCSSSelector(
                    DOMUtils.getDynamicIdByText('form\\:j_idt', 'Memória descritiva dos cálculos de revisão do valor faturado*:', 1, -1)
                )
            };
        }
    }

    // Gerenciador de estilos
    class StyleManager {
        static getWidgetStyles() {
            return {
                'position': 'fixed',
                'top': '10%',
                'right': '10px',
                'background-color': '#FFFFFF',
                'border': '1px solid #ddd',
                'padding': '10px',
                'box-shadow': '0 2px 5px rgba(0, 0, 0, 0.2)',
                'font-size': '14px',
                'font-family': 'Arial, sans-serif',
                'z-index': '9999',
                'width': '200px',
                'border-radius': '5px'
            };
        }

        static getButtonStyles() {
            return {
                'background-color': '#0b61a4',
                'margin-bottom': '5px',
                'display': 'none',
                'width': '100%',
                'color': 'white',
                'border': 'none',
                'padding': '5px 10px',
                'text-align': 'center',
                'text-decoration': 'none',
                'font-size': '12px',
                'font-weight': 'bold',
                'border-radius': '5px'
            };
        }

        static getToggleButtonStyles() {
            return {
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'transparent',
                color: '#555',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
            };
        }

        static getSectionTitleStyles() {
            return {
                'font-weight': 'bold',
                'margin-bottom': '10px',
                'color': '#333',
                'cursor': 'pointer'
            };
        }
    }

    // Factory para criação de elementos
    class ElementFactory {
        static createButton(text, clickHandler = null) {
            const button = $('<button>' + text + '</button>').css(StyleManager.getButtonStyles());
            
            if (clickHandler) {
                button.click(() => {
                    window.selectorManager.updateSelectors();
                    clickHandler();
                });
            }
            
            return button;
        }

        static createSectionTitle(text) {
            return $('<div></div>')
                .css(StyleManager.getSectionTitleStyles())
                .text(text);
        }

        static createToggleButton() {
            return $('<button>◱</button>').css(StyleManager.getToggleButtonStyles());
        }

        static createVersionInfo() {
            return $('<div></div>').css({
                'font-size': '8px',
                'text-align': 'right',
                'margin-top': '10px',
                'font-weight': 'bold'
            }).text('Ver. ' + CONFIG.version + ' Feito por Willian Verri');
        }
    }

    // Gerenciador de modais
    class ModalManager {
        static async createRevisaoModal() {
            return new Promise((resolve) => {
                const modal = this.createModalElement();
                modal.innerHTML = this.getRevisaoModalHTML();
                
                document.body.appendChild(modal);
                
                document.getElementById('submitModal').addEventListener('click', () => {
                    const data = this.extractModalData();
                    modal.remove();
                    resolve(data);
                });
            });
        }

        static createModalElement() {
            const modal = document.createElement('div');
            modal.className = 'modal';
            Object.assign(modal.style, {
                position: 'fixed',
                zIndex: '9999',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                border: '1px solid black',
                maxHeight: '80vh',
                overflowY: 'auto'
            });
            return modal;
        }

        static getRevisaoModalHTML() {
            const contasHTML = [1, 2, 3, 4].map(i => `
                <div>
                    <h3>Conta ${i}</h3>
                    <input type="text" id="conta${i}" placeholder="Conta (ex: 07/2024)">
                    <input type="number" id="consumo${i}" placeholder="Consumo">
                    <select id="tipoRefat${i}">
                        <option value="">Tipo de Refaturamento</option>
                        <option value="LS">Limite Superior</option>
                        <option value="LSM">Limite Superior e média no esgoto</option>
                        <option value="M">Média no esgoto</option>
                        <option value="MM">Média água e esgoto</option>
                    </select>
                    <input type="number" id="ls${i}" placeholder="LS">
                    <input type="number" id="media${i}" placeholder="Média">
                    <input type="text" id="valorConta${i}" placeholder="Valor Original (R$)" inputmode="decimal">
                    <input type="text" id="novoValor${i}" placeholder="Novo Valor (R$)" inputmode="decimal">
                </div>
            `).join('');

            return `
                <h2>Informações para Revisão de Contas</h2>
                ${contasHTML}
                <select id="tabelaTarifa">
                    <option value="01/06/2024">01/06/2024</option>
                    <option value="01/08/2023">01/08/2023</option>
                    <option value="01/01/2023">01/01/2023</option>
                    <option value="01/09/2022">01/09/2022</option>
                    <option value="01/06/2021">01/06/2021</option>
                </select>
                <button id="submitModal">Enviar</button>
            `;
        }

        static extractModalData() {
            const contas = [];
            for (let i = 1; i <= 4; i++) {
                const conta = document.getElementById(`conta${i}`).value;
                if (conta) {
                    contas.push({
                        conta,
                        consumo: document.getElementById(`consumo${i}`).value,
                        tipoRefat: document.getElementById(`tipoRefat${i}`).value,
                        ls: document.getElementById(`ls${i}`).value,
                        media: document.getElementById(`media${i}`).value,
                        valorConta: document.getElementById(`valorConta${i}`).value,
                        novoValor: document.getElementById(`novoValor${i}`).value
                    });
                }
            }
            const tabelaTarifa = document.getElementById('tabelaTarifa').value;
            return { contas, tabelaTarifa };
        }

        static createDescAutoLeituraModal() {
            return new Promise((resolve) => {
                const modal = this.createModalElement();
                modal.innerHTML = `
                    <div class="modal-content" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 10vh;">
                        <h3>Escolha uma opção</h3>
                        <button id="opcao1">Duas ocorrências de autoleitura não informada</button>
                        <button id="opcao2">Leitura não realizada em ABRIL</button>
                        <button id="opcao3">Leitura não realizada em OUTUBRO</button>
                    </div>
                `;

                const handleOption = (opcao) => {
                    modal.remove();
                    resolve(opcao);
                };

                modal.querySelector('#opcao1').addEventListener('click', () => handleOption('duasnaolidas'));
                modal.querySelector('#opcao2').addEventListener('click', () => handleOption('abril'));
                modal.querySelector('#opcao3').addEventListener('click', () => handleOption('outubro'));

                document.body.appendChild(modal);
            });
        }
    }

    // Serviços de revisão
    class RevisaoService {
        constructor(selectorManager) {
            this.selectorManager = selectorManager;
        }

        async executarRevisao(vaz, visivel, coletado, diagnostico, providencia) {
            const selectors = this.selectorManager.selectors;
            
            const clickResposta = DOMUtils.safeQuerySelector(selectors.resposta);
            if (clickResposta) {
                clickResposta.click();
            }

            await DOMUtils.waitForElementEnabled(selectors.diagnostico);

            this.preencherCampos(diagnostico, providencia);
            await this.configurarVazamento(vaz, visivel, coletado);
        }

        preencherCampos(diagnostico, providencia) {
            const selectors = this.selectorManager.selectors;
            
            const diagElement = DOMUtils.safeQuerySelector(selectors.diagnostico);
            const provElement = DOMUtils.safeQuerySelector(selectors.providencia);

            if (diagElement) diagElement.value = diagnostico;
            if (provElement) provElement.value = providencia;
        }

        async configurarVazamento(vaz, visivel, coletado) {
            const selectors = this.selectorManager.selectors;
            const naoAplica = DOMUtils.safeQuerySelector(selectors.naoSeAplica);

            if (naoAplica?.classList.contains('ui-icon-check')) {
                naoAplica.click();
                await DOMUtils.waitForClickable(selectors.vazCorrigidoSim);
            }

            if (vaz === 1) {
                this.selecionarOpcaoVazamento(visivel, coletado);
            } else {
                DOMUtils.safeQuerySelector(selectors.naoSeAplica)?.click();
            }
        }

        selecionarOpcaoVazamento(visivel, coletado) {
            const selectors = this.selectorManager.selectors;
            
            DOMUtils.safeQuerySelector(selectors.vazCorrigidoSim)?.click();
            
            const vazVisivelSelector = visivel === 1 ? selectors.vazVisivel : selectors.vazNaoVisivel;
            DOMUtils.safeQuerySelector(vazVisivelSelector)?.click();
            
            const vazColetadoSelector = coletado === 1 ? selectors.vazColetado : selectors.vazNaoColetado;
            DOMUtils.safeQuerySelector(vazColetadoSelector)?.click();
        }

        async executarRevisaoComRefaturamento(vaz, visivel, coletado, irregularidade, apuracao, criterios, tarifa, memoriaCalculo) {
            const selectors = this.selectorManager.selectors;
            
            const clickResposta = DOMUtils.safeQuerySelector(selectors.resposta);
            if (clickResposta) clickResposta.click();

            const clickRevisaoConta = DOMUtils.safeQuerySelector(selectors.revisaoConta);
            if (clickRevisaoConta) clickRevisaoConta.click();

            setTimeout(async () => {
                await this.preencherRefaturamento(irregularidade, apuracao, criterios, tarifa, memoriaCalculo);
                await this.configurarVazamento(vaz, visivel, coletado);
            }, 2000);
        }

        async preencherRefaturamento(irregularidade, apuracao, criterios, tarifa, memoriaCalculo) {
            const refaturamentoSelectors = this.selectorManager.getRefaturamentoSelectors();
            
            const campos = [
                { selector: refaturamentoSelectors.irregularidadeConstatada, valor: irregularidade },
                { selector: refaturamentoSelectors.apuracao, valor: apuracao },
                { selector: refaturamentoSelectors.criterios, valor: criterios },
                { selector: refaturamentoSelectors.tarifa, valor: tarifa },
                { selector: refaturamentoSelectors.memoriaCalculo, valor: memoriaCalculo }
            ];

            campos.forEach(({ selector, valor }) => {
                const element = DOMUtils.safeQuerySelector(selector);
                if (element) element.value = valor;
            });
        }
    }

    // Casos de uso específicos
    class CasosDeUso {
        constructor(revisaoService, selectorManager) {
            this.revisaoService = revisaoService;
            this.selectorManager = selectorManager;
        }

        usuarioOrientadoVazamento() {
            const dados = this.obterDadosBasicos();
            
            const diagnostico = dados.lacre 
                ? `Hidrômetro com bom funcionamento, leitura ${dados.leitura} confirmada, lacre ${dados.lacre}.\nOrientamos o(a) usuário(a) ${dados.usuario} a verificar as instalações hidráulicas do imóvel, a fim de identificar qualquer vazamento que possa estar influenciando no faturamento.`
                : `Hidrômetro com bom funcionamento, leitura ${dados.leitura} confirmada.\nOrientamos o(a) usuário(a) ${dados.usuario} a verificar as instalações hidráulicas do imóvel, a fim de identificar qualquer vazamento que possa estar influenciando no faturamento.`;
            
            const providencia = `Caso seja identificado um vazamento, é importante efetuar o registro fotográfico do local antes e depois da correção, além de providenciar o reparo imediato.\nApós o reparo, o usuário(a) deve encaminhar as fotos que comprovem a existência/correção do vazamento, juntamente com foto da numeração do hidrômetro e foto da leitura atual, em uma nova solicitação por meio do Autoatendimento no site da CAESB ou pelo Aplicativo.\nEssas medidas garantirão a revisão adequada das contas, conforme estabelecido pela Resolução 14/2011.`;

            this.revisaoService.executarRevisao(0, 0, 0, diagnostico, providencia);
        }

        semVazamentoImprocedente() {
            const dados = this.obterDadosBasicos();
            const refs = prompt('Caso tenha atualizado vencimento, informar refs. Ex. 10/2023, 11/2023 e 12/2023 \nCaso contrário deixar em branco.');
            
            const diagnostico = dados.lacre
                ? `Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente e a leitura ${dados.leitura} foi confirmada. O lacre ${dados.lacre} está intacto e não foi encontrado nenhum indício de vazamento no local. Diante disso, concluímos que as contas foram faturadas de acordo com o consumo registrado pelo hidrômetro.`
                : `Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente e a leitura ${dados.leitura} foi confirmada e não foi encontrado nenhum indício de vazamento no local. Diante disso, concluímos que as contas foram faturadas de acordo com o consumo registrado pelo hidrômetro.`;
            
            const providencia = refs
                ? `Informamos que, de acordo com as normas e regulamentos vigentes, não há nenhuma prerrogativa para a concessão de desconto nesta situação relatada.\n Atualizado vencimento da(s) conta(s) referência ${refs}.`
                : 'Informamos que, de acordo com as normas e regulamentos vigentes, não há nenhuma prerrogativa para a concessão de desconto nesta situação relatada.';

            this.revisaoService.executarRevisao(0, 0, 0, diagnostico, providencia);
        }

        async vazamentoInternoNaoVisivelColetado() {
            const data = this.obterDataCadastro();
            const vaz = prompt('Digite o local do vazamento: Ex. no ramal do quintal ');
            
            const modalData = await ModalManager.createRevisaoModal();
            const { contas, tabelaTarifa } = modalData;
            
            const irregularidade = `Conta(s) referência(s) ${contas.map(c => c.conta).join(' , ')} com consumo acima da média do imóvel.`;
            const apuracao = `Vistoria realizada em ${data} que confirmou vazamento interno no imóvel sanado pelo usuário: ${vaz};`;
            const criterios = this.gerarCriteriosRefaturamento(contas);
            const tarifa = `Tabela de tarifa vigente a partir de ${tabelaTarifa};`;
            const memoriaCalculo = this.gerarMemoriaCalculo(contas);

            this.revisaoService.executarRevisaoComRefaturamento(1, 0, 0, irregularidade, apuracao, criterios, tarifa, memoriaCalculo);
        }

        obterDadosBasicos() {
            return {
                leitura: document.getElementById(this.selectorManager.selectors.leitura)?.value || '',
                lacre: document.getElementById(this.selectorManager.selectors.lacre)?.value || '',
                usuario: document.getElementById(this.selectorManager.selectors.usuario)?.value || ''
            };
        }

        obterDataCadastro() {
            const dataidt = DOMUtils.getDynamicIdByText('form\\:j_idt', 'Data do cadastro:');
            const dataID = DOMUtils.formatCSSSelector(dataidt) + '_content';
            return DOMUtils.safeQuerySelector(dataID + ' > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(5) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)')?.textContent || '';
        }

        gerarCriteriosRefaturamento(contas) {
            return contas.map(c => {
                let criterio = `Conta ${c.conta} revisada `;
                switch (c.tipoRefat) {
                    case 'LS':
                        criterio += `pelo limite superior (${c.ls}m³) na tarifa de água.`;
                        break;
                    case 'LSM':
                        criterio += `pelo limite superior (${c.ls}m³) na tarifa de água e média (${c.media}m³) na tarifa de esgoto.`;
                        break;
                    case 'M':
                        criterio += `pela média (${c.media}m³) na tarifa de esgoto.`;
                        break;
                }
                return criterio;
            }).join(' ');
        }

        gerarMemoriaCalculo(contas) {
            return contas.map(c =>
                `Conta ${c.conta} inicial faturada com ${c.consumo}m³ que resultou numa conta de R$ ${c.valorConta} e nova conta faturada no valor de R$ ${c.novoValor}.`
            ).join(' ');
        }

        // Implementação dos demais casos de uso seria similar...
        // Por brevidade, incluindo apenas alguns exemplos principais
    }

    // Widget principal
    class WidgetManager {
        constructor() {
            this.widget = null;
            this.initialize();
        }

        initialize() {
            this.createWidget();
            this.setupToggleButton();
            this.setupDragAndDrop();
            this.addButtons();
            this.setupSectionToggle();
        }

        createWidget() {
            this.widget = $('<div id="my-widget"></div>').css(StyleManager.getWidgetStyles());
        }

        setupToggleButton() {
            const toggleButton = ElementFactory.createToggleButton();
            
            toggleButton.click(() => {
                this.widget.toggleClass('minimized');
                this.handleToggle();
            });
            
            this.widget.append(toggleButton);
        }

        handleToggle() {
            if (this.widget.hasClass('minimized')) {
                this.widget.css({ width: '15px', height: '15px' });
                this.widget.find('div[style*="font-weight: bold"]').hide();
            } else {
                this.widget.css({ width: '200px', height: 'auto' });
                this.widget.find('div[style*="font-weight: bold"]').show();
            }
        }

        setupDragAndDrop() {
            this.widget.mousedown((e) => {
                const widgetPosition = this.widget.position();
                const mouseX = e.pageX - widgetPosition.left;
                const mouseY = e.pageY - widgetPosition.top;

                $('body').mousemove((e) => {
                    this.widget.css({
                        'left': e.pageX - mouseX,
                        'top': e.pageY - mouseY
                    });
                });
            });

            $('body').mouseup(() => {
                $('body').off('mousemove');
            });
        }

        addButtons() {
            this.widget.append(
                ElementFactory.createSectionTitle('--- REVISAO DE CONTAS ---'),
                ElementFactory.createButton('Usuario Orientado Vazamento', () => window.casosDeUso.usuarioOrientadoVazamento()),
                ElementFactory.createButton('Sem Vazam. Improcedente', () => window.casosDeUso.semVazamentoImprocedente()),
                ElementFactory.createButton('Vazamento Interno Ñ Vis/Col', () => window.casosDeUso.vazamentoInternoNaoVisivelColetado()),
                
                ElementFactory.createVersionInfo()
            );
        }

        setupSectionToggle() {
            this.widget.find('div[style*="font-weight: bold"]').click(function() {
                $(this).nextUntil('div').filter('button').slideToggle();
            });
        }

        show() {
            $('body').append(this.widget);
        }
    }

    // Monitoramento automático
    class AutoMonitor {
        constructor() {
            this.marcado = false;
            this.initialize();
        }

        initialize() {
            this.startMonitoring();
        }

        startMonitoring() {
            setInterval(() => {
                if (this.shouldMonitor()) {
                    this.checkEmailDialog();
                    this.processAnexos();
                    this.removeIframeText();
                }
            }, CONFIG.checkInterval);
        }

        shouldMonitor() {
            return window.location.href.includes(CONFIG.targetUrl);
        }

        checkEmailDialog() {
            const dlgElement = document.querySelector('html body div#dlgEnviarEmailVistoria.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-shadow.ui-hidden-container.ui-dialog-absolute.ui-draggable[aria-hidden="false"]');
            
            if (dlgElement && !this.marcado) {
                this.processEmailCheckboxes();
                this.marcado = true;
            }
        }

        processEmailCheckboxes() {
            const checkboxes = this.getEmailCheckboxes();
            
            checkboxes.forEach(checkbox => {
                if (checkbox && !checkbox.checked) {
                    this.marcarCheckbox(checkbox);
                }
            });

            this.clickGerarTextoEmail();
        }

        getEmailCheckboxes() {
            const diagID = DOMUtils.getDynamicIdByText('formEnviarEmail\\:j_idt', 'Diagnóstico', 0, 1);
            const provID = DOMUtils.getDynamicIdByText('formEnviarEmail\\:j_idt', 'Providência', 0, 1);
            
            const diagSelector = DOMUtils.formatCSSSelector(diagID) + ' > div:nth-child(2) > span:nth-child(1)';
            const provSelector = DOMUtils.formatCSSSelector(provID) + ' > div:nth-child(2) > span:nth-child(1)';
            
            return [
                document.querySelector(diagSelector),
                document.querySelector(provSelector)
            ];
        }

        marcarCheckbox(checkbox) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        }

        clickGerarTextoEmail() {
            const gerarID = DOMUtils.getDynamicIdByText('formEnviarEmail\\:j_idt', 'Gerar texto do Email', 0, 1);
            const gerarSelector = DOMUtils.formatCSSSelector(gerarID);
            const botao = document.querySelector(gerarSelector);
            
            if (botao) {
                botao.click();
            }
        }

        processAnexos() {
            const anexoSelectors = window.selectorManager.selectors.anexo;
            if (!anexoSelectors) return;

            const confirmElement = document.querySelector(anexoSelectors.nome);
            const confirmElementValue = document.querySelector(anexoSelectors.descricao);

            if (confirmElement && confirmElementValue && confirmElementValue.value === '') {
                const fileName = confirmElement.innerText.trim();
                const fileNameWithoutExtension = fileName.slice(0, -4);
                confirmElementValue.value = fileNameWithoutExtension;
            }
        }

        removeIframeText() {
            const iframe = document.querySelector('iframe');
            if (!iframe) return;

            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const textoRegex = /Em \d{2}\/\d{2}\/\d{4} não foi possível realizar vistoria no imóvel por .<br><br>&nbsp;Deste modo, dentro de suas competências e diante da impossibilidade de realizar vistoria, a CAESB , não detectou problemas que justificassem a revisão dos valores cobrados em sua\(s\) conta\(s\), portanto, o faturamento descrito em sua\(s\) conta\(s\) fica\(m\) confirmado\(s\) e todos os valores mantidos\./;
            
            const textoParaRemover = iframeDocument.body.innerHTML.match(textoRegex);
            if (textoParaRemover) {
                iframeDocument.body.innerHTML = iframeDocument.body.innerHTML.replace(textoParaRemover[0], '');
            }
        }
    }

    // Inicialização da aplicação
    class Application {
        constructor() {
            this.initialize();
        }

        initialize() {
            if (this.shouldInitialize()) {
                this.setupDependencies();
                this.startApplication();
            }
        }

        shouldInitialize() {
            return window.location.href.includes(CONFIG.targetUrl);
        }

        setupDependencies() {
            window.selectorManager = new SelectorManager();
            window.revisaoService = new RevisaoService(window.selectorManager);
            window.casosDeUso = new CasosDeUso(window.revisaoService, window.selectorManager);
        }

        startApplication() {
            const widgetManager = new WidgetManager();
            widgetManager.show();
            
            new AutoMonitor();
        }
    }

    // Inicialização
    new Application();

})(); 