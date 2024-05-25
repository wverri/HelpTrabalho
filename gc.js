// ==UserScript==
// @name        HelpGCOM
// @namespace   https://sistemas.caesb.df.gov.br/gcom/
// @match       *sistemas.caesb.df.gov.br/gcom/*
// @match       *sistemas.caesb/gcom/*
// @version     2.13
// @grant       none
// @license     MIT
// @description Auxiliar para trabalhos no GCOM!
// @downloadURL https://update.greasyfork.org/scripts/487748/HelpGCOM.user.js
// @updateURL https://update.greasyfork.org/scripts/487748/HelpGCOM.meta.js
// ==/UserScript==

var version = GM_info.script.version;

// Define as estilizações do widget em um objeto CSS
var widgetStyles = {
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

// Define as estilizações dos botões em um objeto CSS
var buttonStyles = {
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

// Cria o widget
var myWidget = $('<div id="my-widget"></div>').css(widgetStyles);

// Define as estilizações do botão de minimizar/maximizar
var toggleButtonStyles = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'transparent',
    color: '#555',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
};

// Cria o botão de minimizar/maximizar
var toggleButton = $('<button>◱</button>').css(toggleButtonStyles);

// Adiciona o evento de clique para alternar entre as versões maximizada e minimizada
toggleButton.click(function() {
    myWidget.toggleClass('minimized');
    // Ajusta as estilizações conforme necessário para a versão minimizada
    if (myWidget.hasClass('minimized')) {
        myWidget.css({
            width: '15px', // ou outro valor adequado
            height: '15px', // ou outro valor adequado
        });
        // Esconde os SectionTitles quando minimizado
        myWidget.find('div[style*="font-weight: bold"]').hide();
    } else {
        // Ajusta as estilizações para a versão maximizada
        myWidget.css({
            width: '200px', // ou outro valor adequado
            height: 'auto', // ou outro valor adequado
        });
        // Mostra os SectionTitles quando maximizado
        myWidget.find('div[style*="font-weight: bold"]').show();
    }
});

// Adiciona o botão de minimizar/maximizar ao widget
myWidget.append(toggleButton);


// Adiciona o evento de arrastar ao widget
myWidget.mousedown(function(e) {
    var initialX = e.pageX - $(this).offset().left;
    var initialY = e.pageY - $(this).offset().top;
    var widgetPosition = myWidget.position();
    var mouseX = e.pageX - widgetPosition.left;
    var mouseY = e.pageY - widgetPosition.top;

    $('body').mousemove(function(e) {
        myWidget.css({
            'left': e.pageX - mouseX,
            'top': e.pageY - mouseY
        });
    });
});

// Remove o evento de arrastar ao soltar o botão do mouse
$('body').mouseup(function() {
    $('body').off('mousemove');
});

// Função auxiliar para criar botões
var createButton = function(text) {
    return $('<button>' + text + '</button>').css(buttonStyles);
};

// Função auxiliar para criar títulos de seção
var createSectionTitle = function(text) {
    return $('<div></div>').css({
        'font-weight': 'bold',
        'margin-bottom': '10px',
        'color': '#333',
        'cursor': 'pointer'
    }).text(text);
};

var createButtonWithClick = function(text, clickHandler) {
    var button = $('<button>' + text + '</button>').css(buttonStyles);
    button.click(clickHandler);
    return button;
};

// Adiciona os elementos ao widget
myWidget.append(
    createSectionTitle('--- TITULARIDADE ---'),
    createButtonWithClick('Alteração para Titular Atual', function(){ AltTitAtual(); }),
    createButtonWithClick('Alteração Realizada', function(){ AltRealizada(); }),
    createButtonWithClick('Alteração com Débitos', function(){ AltDebitos(); }),
    createButtonWithClick('Alteração Falta Documentos', function(){ AltFaltaDoc(); }),
    createButtonWithClick('Abrir todos os anexos', function(){ AbrirAnexos(); }),
    createSectionTitle('--- REVISAO DE CONTAS ---'),
    createButtonWithClick('Usuario Orientado Vazamento', function(){ UsuarioOrientadoVazamento(); }),
    createButtonWithClick('Portão fechado', function(){ PortaoFechado(); }),
    createButtonWithClick('Sem Vazam. Improcedente', function(){ SemVazamImprocedente(); }),
    createButtonWithClick('Vazamento Interno Ñ Vis/Col', function(){ VazInternNVisCol(); }),
    createButtonWithClick('Leitura informada pelo usuario', function(){ LeituraInformada(); }),
    createButtonWithClick('Vazamento Coberto', function(){ VazCoberto(); }),
    createButtonWithClick('Erro de leitura', function(){ ErroLeitura(); }),
    createButtonWithClick('Agendamento de leitura', function(){ AgendLeitura(); }),
    createButtonWithClick('Vazamento Visivel/Coletado', function(){ VazVisCol(); }),
    createButtonWithClick('NºHid.ñ conf. já atualizado', function(){ NhidNConf(); }),
    createButtonWithClick('Vaz.Negado mais de 2 LS', function(){ VazNegado(); }),
    createButtonWithClick('Distribuição de Consumo', function(){ DistribuicaoConsumo(); }),
    createButtonWithClick('Vaz.Abaixo LS S/Esg', function(){ VazAbaixoLs(); }),
    createButtonWithClick('Clt ausente Vist realizada', function(){ CltAusenteVistRealizada(); }),
    createButtonWithClick('Vaz depois cavalete', function(){ VazDepoisCavalete(); }),
    createButtonWithClick('Multa imp.corte', function(){ MultaImpCorte(); }),
    createButtonWithClick('Multa Agend Fora Prazo', function(){ AgendLeituraForaPrazo(); }),
    createSectionTitle('--- DADOS CADASTRAIS ---'),
    createButtonWithClick('Alteração de categoria', function(){ AlteracaoCategoria(); }),
    createButtonWithClick('Alteração de Unidades de Consumo', function(){ AlteracaoUnidadesConsumo(); }),
    createButtonWithClick('Troca de HD**', function(){ TrocaHD(); }),
    createButtonWithClick('Descad.Autoleitura', function(){ DescAutoLeitura(); }),
    createSectionTitle('--- EXTRAS ---'),
    createButtonWithClick('Colocar Hora Atual', function(){ HoraAtual(); }),
    createButtonWithClick('Anexar arquivos', function(){ AnexarArquivos(); }),
    createButtonWithClick('Reforço feita hoje', function(){ ReforcoFeitaHoje(); }),
    createButtonWithClick('Leit 04/2023', function(){ Leit042023(); }),
    createSectionTitle('--- TARIFA SOCIAL ---'),
    createButtonWithClick('Usuario Descadastr.', function(){ UsuarioDescadastr(); }),
    createButtonWithClick('Fora da Lista', function(){ ForaDaLista(); }),
    createButtonWithClick('Usuário já tem tar. social', function(){ UsuarioJaTemTarSocial(); }),
    createButtonWithClick('Usuário vinculado', function(){ UsuarioVinculadoTarSocial(); }),
    createSectionTitle('--- EXEC.CONS. CORTE ---'),
    createButtonWithClick('Proprietario', function(){ Proprietario(); }),
    createButtonWithClick('Inq.Sem.Cons.', function(){ InqSemCons(); }),
    createButtonWithClick('Inq.Cons.Final', function(){ InqConsFinal(); }),
    createButtonWithClick('Corte ñ exec.', function(){ CorteNExec(); }),
    $('<div></div>').css({
    'font-size': '8px',
    'text-align': 'right',
    'margin-top': '10px',
    'font-weight': 'bold'
    }).text('Ver. ' + version + ' Feito por Willian Verri'),
);

// Torna os botões visíveis ao clicar nos títulos de seção
myWidget.find('div[style*="font-weight: bold"]').click(function() {
    $(this).nextUntil('div').filter('button').slideToggle();
});

// Verifica se a URL corresponde à página de "baixa" do atendimento
if (window.location.href.includes('app/atendimento/os/baixa')) {
    $('body').append(myWidget);
}

// LISTAGEM COM TODOS OS IDT's

// Colocar nomes dos anexos automaticamente
const elementPairs = [
    ['#formConfirmaAnexo\\:j_idt868 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', '#formConfirmaAnexo\\:j_idt872'],  // Anexo na tela Atendimento da Ordem de serviço (Anexos do Atendimento)
    ['#formConfirmaAnexo\\:j_idt1787 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', '#formConfirmaAnexo\\:j_idt1791'],  // Anexo na tela de baixa OSC - ANEXO OSC
    ['#formConfirmaAnexoEmail\\:j_idt2002 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', '#formConfirmaAnexoEmail\\:j_idt2005'],  // ANEXO DA BAIXA DA OSC - ATENDIMENTO
    ['#formClienteConfirmaAnexo\\:j_idt618 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1)', '#formClienteConfirmaAnexo\\:descricaoArquivo'],
    ['#formConfirmaAnexo\\:j_idt749 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', '#formConfirmaAnexo\\:j_idt752'],
    ['#formCadastroAnexo\\:j_idt710 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1)', '#formCadastroAnexo\\:j_idt713'],
];

// Adiciona botões na função de REFATURAR CONTA.
const contaTitleElement = document.querySelector('#j_idt687_title');
// Adiciona botão na função de atualizar vencimento.
const AttVencElement = document.querySelector('#j_idt665_title');
// Text area da tela de atualizar vencimento de conta
const textarea2idt = '#formVencimento\\:j_idt683';
// Text area da tela de refaturamento
const textareaidt = '#formAlteracaoConta\\:j_idt749';
// Leitura da tela de refaturamento
const leitidt = '#formAlteracaoConta\\:j_idt724';
// botão de media no esgoto e leitura criada nao na tela de refaturamento.
const mediaesgoto = '#formAlteracaoConta\\:j_idt740 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)';
const leituracriadanao = '#formAlteracaoConta\\:j_idt744 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)';

// Abrir anexos na tela de atendimento
const tbodyidt = '#abas\\:formAtendimentoAnexo\\:j_idt656_data';
// Tela de abrir anexos na tela de atendimento
const prefix3 = 'abas:formAtendimentoAnexo:j_idt656:';
const menuId3 = 'j_idt662_menu';
const abrir3 = 'j_idt665';
const prefix4 = 'abas:formAtendimentoAnexo:j_idt666:';
const menuId4 = 'j_idt672_menu';
const abrir4 = 'j_idt673';

// Tela de abrir anexos na tela de baixa
// Anexos do atendimento
const prefix1 = 'formOsAnexoBean:abasAtendimento:j_idt1765:';
const menuId1 = 'j_idt1771_menu';
const abrir1 = 'j_idt1772';
// Anexos da Ordem de Serviço
const prefix2 = 'formOsAnexoBean:abasAtendimento:tableAtendimento:';
const menuId2 = 'j_idt1759_menu';
const abrir2 = 'j_idt1762';

// CheckBox do enviar email resposta
const checkemail1 = 'formEnviarEmail:j_idt1811_input';
const checkemail2 = 'formEnviarEmail:j_idt1813_input';
const botaoemail = 'formEnviarEmail:j_idt1817';

// Tela de Baixa - usuário, leitura e titulo de anexar.
const tagusuario = '#form1\\:j_idt518';
const tagleitura = '#form1\\:j_idt520';
const taganexar = '#form1\\:j_idt453_header';

(function() {
    var checkExist = setInterval(function() {

        if (window.location.href.includes('app/atendimento/os/baixa')) {

            // Verifica se o elemento #dlgEnviarEmail1_title está presente
            var dlgEnviarEmailElement = document.querySelector('html body div#dlgEnviarEmail1.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-shadow.ui-hidden-container.ui-dialog-absolute.ui-draggable[aria-hidden="false"]');
            if (dlgEnviarEmailElement) {
                // Verifica se os checkboxes estão marcados
                var checkbox1 = document.getElementById(checkemail1);
                var checkbox2 = document.getElementById(checkemail2);
                // Função para marcar um checkbox
                function marcarCheckbox(checkbox) {
                    checkbox.checked = true;
                    // Dispara um evento de mudança, pois alguns scripts podem estar escutando isso
                    var event = new Event('change');
                    checkbox.dispatchEvent(event);
                }
                // Marca os checkboxes se não estiverem marcados
                if (checkbox1 && !checkbox1.checked) {
                    marcarCheckbox(checkbox1);
                }
                if (checkbox2 && !checkbox2.checked) {
                    marcarCheckbox(checkbox2);
                    var botaoGerarTextoEmail = document.getElementById(botaoemail);
                    if (botaoGerarTextoEmail) {
                        botaoGerarTextoEmail.click();
                    }
                }
            }
        }


        // Botão de Abrir Anexos na tela de Atendimento
        const tabElement = document.querySelector('li.ui-state-default.ui-corner-top.ui-tabs-selected.ui-state-active[aria-selected="true"]');
        const tbody = document.querySelector(tbodyidt);

        if (tabElement && (!tabElement.nextSibling || tabElement.nextSibling.nodeName !== 'BUTTON') && tbody ) { //
            console.log('Entrou');

            // Cria um botão
            var button = document.createElement('button');
            button.textContent = 'Abrir todos os anexos';
            button.addEventListener('click', function() {
                AbrirAnexosAtendimento();
            });

            // Aplica estilos ao botão
            button.style.cssText = 'background-color: #0b61a4; color: white; border: none; padding: 5px 10px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold; border-radius: 5px; margin-left: 10px;';

            // Insere o botão após o elemento <li>
            tabElement.parentNode.insertBefore(button, tabElement.nextSibling);

        }

        // Adiciona botão de abrir anexos na tela de ANEXOS - BAIXA
        const baixaElement = document.querySelector("#formOsAnexoBean\\:abasAtendimento\\:panelArquivos_header");
        const baixaElement2 = document.querySelector("#formOsAnexoBean\\:abasAtendimento\\:panelAtendimentoArquivos_header");
        if (baixaElement && (countElements(prefix2, menuId2, 20) > 0) && (!baixaElement.nextSibling || baixaElement.nextSibling.nodeName !== 'BUTTON')) {
            console.log('Botão anexos tela baixa');
            // Cria um botão
            var button = document.createElement('button');
            button.textContent = 'Abrir todos os anexos';
            button.addEventListener('click', function() {
                event.preventDefault();
                AbrirAnexos();
            });

            // Aplica estilos ao botão
            button.style.cssText = 'background-color: #0b61a4; color: white; border: none; padding: 5px 10px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold; border-radius: 5px; margin-left: 10px;';

            // Insere o botão após o elemento <li>
            baixaElement.parentNode.insertBefore(button, baixaElement.nextSibling);
        }
        if (baixaElement2 && (countElements(prefix1, menuId1, 20) > 0) && (!baixaElement2.nextSibling || baixaElement2.nextSibling.nodeName !== 'BUTTON')) {
            console.log('Botão anexos tela baixa');
            // Cria um botão
            var button = document.createElement('button');
            button.textContent = 'Abrir todos os anexos';
            button.addEventListener('click', function() {
                event.preventDefault();
                AbrirAnexos();
            });

            // Aplica estilos ao botão
            button.style.cssText = 'background-color: #0b61a4; color: white; border: none; padding: 5px 10px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold; border-radius: 5px; margin-left: 10px;';

            // Insere o botão após o elemento <li>
            baixaElement2.parentNode.insertBefore(button, baixaElement2.nextSibling);
        }

        const targetElement = document.querySelector('#form1\\:dadosBaixa_header');
        if (targetElement && (!targetElement.nextSibling || targetElement.nextSibling.nodeName !== 'BUTTON')) {
            const button = document.createElement('button');
            button.textContent = 'Data Atual';
            button.style.cssText = 'background-color: #0b61a4; color: white; border: none; padding: 5px 10px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold; border-radius: 5px; margin-left: 10px;';

            button.addEventListener('click', function() {
                event.preventDefault();
                HoraAtual();
            });

            // Insere o botão após o elemento de destino
            targetElement.parentNode.insertBefore(button, targetElement.nextSibling);
        }

        for (const [confirmElementSelector, confirmElementValueSelector] of elementPairs) {
            const confirmElement = document.querySelector(confirmElementSelector);
            const confirmElementValue = document.querySelector(confirmElementValueSelector);

            if (confirmElement && confirmElementValue && confirmElementValue.value === '') {
                const fileName = confirmElement.innerText.trim();
                const fileNameWithoutExtension = fileName.slice(0, -4);
                confirmElementValue.value = fileNameWithoutExtension;
            }
        }

        // Adiciona botões na função de refaturar conta.
        //const contaTitleElement = document.querySelector('#j_idt674_title');
        if (contaTitleElement && (!contaTitleElement.nextSibling || contaTitleElement.nextSibling.nodeName !== 'BUTTON') && contaTitleElement.innerText.trim() === 'Conta') {
            const createButton = (text, clickHandler) => {
                const button = document.createElement('button');
                button.textContent = text;
                button.addEventListener('click', clickHandler);
                button.style.cssText = 'background-color: #0b61a4; color: white; border: none; padding: 5px 10px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold; border-radius: 5px; margin-left: 5px;';
                return button;
            };

            const refatButton = createButton('Refat p/ Vazamento Interno', refatVazamento);
            const atualizarVencimentoButton = createButton('Att. Vencimento', updateVencimento);
            const leituraInformadaButton = createButton('Leit Informada Usu.', leituraInformada);
            const refatCavaleteButton = createButton('Vaz.Cavalete Depois', refatCavalete);
            const agendLeituraButton = createButton('Agend.Leit.', agendLeitura);

            contaTitleElement.parentNode.insertBefore(refatCavaleteButton, contaTitleElement.nextSibling);
            contaTitleElement.parentNode.insertBefore(refatButton, contaTitleElement.nextSibling);
            contaTitleElement.parentNode.insertBefore(leituraInformadaButton, contaTitleElement.nextSibling);
            contaTitleElement.parentNode.insertBefore(agendLeituraButton, contaTitleElement.nextSibling);
            contaTitleElement.parentNode.insertBefore(atualizarVencimentoButton, contaTitleElement.nextSibling);
        }

        // Adiciona botão na função de atualizar vencimento.
        //const AttVencElement = document.querySelector('#j_idt655_title');
        if (AttVencElement && (!AttVencElement.nextSibling || AttVencElement.nextSibling.nodeName !== 'BUTTON') && AttVencElement.innerText.trim() === 'Alterar Data Vencimento') {
            const createButton = (text, clickHandler) => {
                const button = document.createElement('button');
                button.textContent = text;
                button.addEventListener('click', clickHandler);
                button.style.cssText = 'background-color: #0b61a4; color: white; border: none; padding: 5px 10px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold; border-radius: 5px; margin-left: 5px;';
                return button;
            };

            const AttVencButton = createButton('Revisão improcedente', AttVenc);
            AttVencElement.parentNode.insertBefore(AttVencButton, AttVencElement.nextSibling);
        }

        // Adicionar funções no campo de data/hora na baixa de OS
        if (window.location.href.includes('app/atendimento/os/baixa')) {
            if ($('#ui-datepicker-div').is(':visible')) {
                // Verifique se o campo de texto já foi adicionado
                var sliderHandles = document.querySelectorAll(".ui-slider-handle");
                var textField = sliderHandles[0].nextSibling;
                if (!textField || textField.tagName !== 'INPUT') {
                    // Crie o campo de texto ao lado do elemento de slider
                    textField = document.createElement("input");
                    textField.type = "text";
                    textField.style.marginLeft = "150px";
                    textField.setAttribute("pattern", "[0-9]{2}:[0-9]{2}");
                    textField.setAttribute("maxlength", "5");
                    sliderHandles[0].parentNode.insertBefore(textField, sliderHandles[0].nextSibling);

                    // Adicione os event listeners ao campo de texto
                    textField.addEventListener("input", function() {
                        var valor = this.value.replace(/\D/g, '').substring(0, 4);
                        var hora = valor.substring(0, 2);
                        var minuto = valor.substring(2);
                        this.value = hora + ":" + minuto;
                    });

                    textField.addEventListener("keydown", function(event) {
                        if (event.keyCode === 13) {
                            var valor = this.value.split(":");
                            var hora = valor[0];
                            var minuto = valor[1];
                            sliderHora(hora);
                            sliderMinuto(minuto);
                            this.focus();
                        }
                    });
                }

                // Verifique se o input de data já foi adicionado
                var datePickerInput = $('#ui-datepicker-div .ui-datepicker-calendar').prevAll('input[type="text"]').first();
                if (datePickerInput.length === 0) {
                    // Crie o input de data
                    datePickerInput = document.createElement('input');
                    datePickerInput.type = 'text';
                    datePickerInput.placeholder = 'Digite a data dd/mm/aaaa só num.';

                    datePickerInput.addEventListener('input', () => {
                        let value = datePickerInput.value.replace(/\D/g, '');
                        if (value.length > 8) value = value.slice(0, 8);
                        value = value.replace(/(\d{2})(\d)/, '$1/$2');
                        value = value.replace(/(\d{2})(\d)/, '$1/$2');
                        datePickerInput.value = value;
                    });

                    datePickerInput.addEventListener('change', () => {
                        const [dia, mes, ano] = datePickerInput.value.split('/');
                        const today = new Date();
                        const selectAno = $('#ui-datepicker-div .ui-datepicker-year');
                        selectAno.val(ano ? ano : today.getFullYear().toString());
                        selectAno.trigger('change');

                        const selectMes = $('#ui-datepicker-div .ui-datepicker-month');
                        const maxDia = new Date().getDate();
                        let diaSelecionado = parseInt(dia);
                        if (diaSelecionado > maxDia) {
                            selectMes.val(today.getMonth() - 1);
                            selectMes.trigger('change');
                        } else {
                            selectMes.val(mes ? mes - 1 : today.getMonth());
                            selectMes.trigger('change');
                        }

                        const elementos = $('[data-month="' + selectMes.val() + '"][data-year="' + selectAno.val() + '"] a');
                        for (let i = 0; i < elementos.length; i++) {
                            if (parseInt(elementos[i].textContent) === diaSelecionado) {
                                elementos[i].click();
                                break;
                            }
                        }
                        textField.focus();
                    });

                    datePickerInput.addEventListener('keyup', function(event) {
                        if (event.keyCode === 13) {
                            setTimeout(function() {
                                textField.focus();
                                $('.ui-slider-handle:first-child').nextSibling.focus();
                            }, 300);
                        }
                    });

                    var table = $('#ui-datepicker-div .ui-datepicker-calendar');
                    if (!table.prev().is('input[type="text"]')) {
                        if (table.parent().length === 0) {
                            $('body').prepend(datePickerInput);
                            datePickerInput.focus();
                        } else {
                            table.before(datePickerInput);
                            datePickerInput.focus();
                        }
                    }
                }
            }
        }
    }, 100);
})();

// Função de atualizar vencimento

function AttVenc() {
    const datarefat = document.getElementById('formVencimento:dataVencimento_input');
    if (datarefat) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 15);
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();
        const newDate = `${day}/${month}/${year}`;
        datarefat.value = newDate;
    }
    var OSC = prompt('Digite o número da OSC de revisão improcedente: ');
    const textarea2 = document.querySelector(textarea2idt);
    if (textarea2) {
        textarea2.value = `Revisão improcedente conforme OSC ${OSC}. Atualizado vencimento.`;
    }
}

// Função para atualizar o vencimento da tela de Refaturamento
function updateVencimento() {
    const datarefat = document.getElementById('formAlteracaoConta:dataVencimento_input');
    if (datarefat && datarefat.value) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 15);

        // Obtém a data atual do elemento datarefat
        const dataAtualElementoParts = datarefat.value.split('/'); // Supondo que a data esteja no formato "DD/MM/YYYY"
        const dataAtualElemento = new Date(dataAtualElementoParts[2], dataAtualElementoParts[1] - 1, dataAtualElementoParts[0]); // Formato: YYYY, MM (0-11), DD

        // Verifica se a nova data é maior que a data atual do elemento
        if (currentDate > dataAtualElemento) {
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear().toString();
            const newDate = `${day}/${month}/${year}`;
            datarefat.value = newDate;
        } else {
            console.log("A nova data não é superior ao vencimento atual. Nenhuma alteração realizada.");
        }
    }
}

function EsgMda() {
    const esgMDA = document.querySelector(mediaesgoto);
    if (esgMDA) {
        esgMDA.click();
    }
}

function LeituraCriadaN() {
    const leitcriada = document.querySelector(leituracriadanao);
    if (leitcriada) {
        leitcriada.click();
    }
}

function refatVazamento() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.position = 'fixed';
    modal.style.left = '50%';
    modal.style.top = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '9999'; // Valor alto para z-index
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    modal.style.width = '400px'; // Definir uma largura
    modal.style.height = 'auto'; // Altura automática

    modal.innerHTML = `
        <div class="modal-content">
            <h3>Refat p/ Vazamento</h3>
            <label>
                <input type="checkbox" name="refatLS" value="refatLS" /> Refat p/ LS
            </label>
            <div class="radio-group">
                <label>
                    <input type="radio" name="qualLS" value="1º" /> 1º
                </label>
                <label>
                    <input type="radio" name="qualLS" value="2º" /> 2º
                </label>
            </div>
            <label>
                <input type="checkbox" name="refatEsgoto" value="refatEsgoto" /> Refat p/ Média no esgoto
            </label>
            <div class="input-group">
                <p>
                <label>Informe o nº da OSC:</label>
                <input type="text" id="oscNumeroInput" />
            </div>
            <div class="button-group">
                <button id="confirmButton">Confirmar</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('#confirmButton').addEventListener('click', () => {
        const refatLS = modal.querySelector('input[name="refatLS"]').checked;
        const qualLS = modal.querySelector('input[name="qualLS"]:checked') ? modal.querySelector('input[name="qualLS"]:checked').value : '';
        const refatEsgoto = modal.querySelector('input[name="refatEsgoto"]').checked;
        const oscNumero = modal.querySelector('#oscNumeroInput').value;

        if (refatLS && qualLS) {
            document.querySelector('li[data-label="Ocorrência Resolvida (91)"]').click();
            document.querySelector('li[data-label="Limite Superior"]').click();
        }
        if (refatEsgoto) {
            EsgMda();
        }

        const textarea = document.querySelector(textareaidt);
        console.log(textarea);
        if (textarea) {
            if (refatLS && qualLS && refatEsgoto) {
                textarea.value = `Vazamento interno não visível e não coletado para o esgoto conforme OSC ${oscNumero}. Refat p/ ${qualLS} Limite Superior na água e Média no esgoto.`;
            } else if (!refatEsgoto) {
                textarea.value = `Vazamento interno não visível conforme OSC ${oscNumero}. Refat p/ ${qualLS} Limite Superior na água.`;
            } else if (!refatLS && refatEsgoto) {
                textarea.value = `Vazamento interno não visível e não coletado para o esgoto conforme OSC ${oscNumero}. Refat p/ Média no esgoto.`;
            }
        }

        modal.remove();
        LeituraCriadaN();
        updateVencimento();
    });

    document.body.appendChild(modal);
}

function refatCavalete() {
    updateVencimento();
    var OSC = prompt('Digite o número da OSC de vazamento no cavalete sanado pela CAESB: ');
    var data = prompt('Digite a data do vazamento sanado no formato dd/mm/aaaa:');
    document.querySelector('li[data-label="Vazamento Após o Hidrômetro (71)"]').click();
    document.querySelector('li[data-label="Média"]').click();
    EsgMda();
    LeituraCriadaN();
    const textarea = document.querySelector(textareaidt);
    if (textarea) {
        textarea.value = `Vazamento após o hidrômetro sanado pela CAESB em ${data} pela OSM ${OSC}. Refat p/ média de consumo.`;
    }
}

function agendLeitura() {
    var leitura = prompt('Digite a leitura no dia da vistoria: ');
    var data = prompt('Digite a data da vistoria informada no formato dd/mm/aaaa \nou deixe em branco se for a mesma da leitura:');
    var OSC = prompt('Digite o número da OSC de agendamento: ');
    document.querySelector('li[data-label="Ocorrência Resolvida (91)"]').click();
    document.querySelector('li[data-label="Medido"]').click();
    const leit = document.querySelector(leitidt);
    leit.value = leitura;
    const dataleitura = document.getElementById('formAlteracaoConta:dataLeitura_input');
    if (dataleitura) { dataleitura.value = data; }
    const textarea = document.querySelector(textareaidt);
    if (textarea) { textarea.value = `Retirada multa de impedimento de leitura mediante agendamento OSC ${OSC} com leitura ${leitura} em ${data}.`; }
    LeituraCriadaN();
    updateVencimento();
}


function leituraInformada() {
    var leitura = prompt('Digite a leitura informada pelo usuário: ');
    var data = prompt('Digite a data da leitura informada no formato dd/mm/aaaa \nou deixe em branco se for a mesma da leitura::');
    var OSC = prompt('Digite o número da OSC: ');
    document.querySelector('li[data-label="Leitura Informada Pelo Usuário (84)"]').click();
    document.querySelector('li[data-label="Medido"]').click();
    const leit = document.querySelector(leitidt);
    leit.value = leitura;
    const dataleitura = document.getElementById('formAlteracaoConta:dataLeitura_input');
    if (dataleitura) { dataleitura.value = data; }
    const textarea = document.querySelector(textareaidt);
    if (textarea) { textarea.value = `Leitura informada pelo usuário de ${leitura} em ${data} conforme OSC ${OSC}.`; }
    LeituraCriadaN();
    updateVencimento();
}

// Função que será chamada ao dar enter no campo de texto
function sliderHora(hora) {
    console.log("Entrou na função hora: " + hora + "h.");

    const table = document.querySelector('.ui-datepicker-calendar');
    const activeDay = table.querySelector('.ui-state-active');
    const month = activeDay.parentElement.dataset.month;
    const year = activeDay.parentElement.dataset.year;
    const day = activeDay.textContent;

    const selectedDate = new Date(year, month, day);
    const currentDate = new Date();

    const horaAtual = currentDate.getHours();
    let horaPosicao;

    if (selectedDate.toDateString() === currentDate.toDateString()) {
        horaPosicao = (123 * hora) / horaAtual;
    } else {
        horaPosicao = (123 * hora) / 23;
    }

    const sliderHandleHora = document.querySelector(".ui_tpicker_hour_slider");
    moverSlider(sliderHandleHora, horaPosicao);
}

function sliderMinuto(minuto) {
    const minutoPosicao = (123 * minuto) / 59;
    const sliderHandleMinuto = document.querySelector(".ui_tpicker_minute_slider");
    moverSlider(sliderHandleMinuto, minutoPosicao);
}

function moverSlider(sliderHandle, posicao) {
    const eventOptions = {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    };

    const eventStart = new MouseEvent("mousedown", eventOptions);
    const eventMove = new MouseEvent("mousemove", {
        ...eventOptions,
        clientX: sliderHandle.getBoundingClientRect().left + posicao,
    });
    const eventEnd = new MouseEvent("mouseup", {
        ...eventOptions,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2) + (sliderHandle.parentElement.offsetWidth * 0.5),
    });

    sliderHandle.dispatchEvent(eventStart);
    sliderHandle.dispatchEvent(eventMove);
    sliderHandle.dispatchEvent(eventEnd);
}


function HoraAtual() { //Colocar Hora Atual
    var data = new Date();
    var hora = data.getHours();
    var minuto = data.getMinutes();

    //clica data inicio
    document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td/span/button/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

    // Hora Inicio
    var sliderHandleHora = document.querySelector(".ui_tpicker_hour_slider");
    var hinicio = minuto < 10 ? (123 * (hora - 1)) / hora : 123;
    moverSlider(sliderHandleHora, hinicio);

    // Minuto Inicio
    var sliderHandleMinuto = document.querySelector(".ui_tpicker_minute_slider");
    var minicio = minuto < 10 ? 112 : (123 * (minuto - 10)) / minuto;
    moverSlider(sliderHandleMinuto, minicio);

    //clica data Fim
    document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/span/button/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

    // Hora Fim
    sliderHandleHora = document.querySelector(".ui_tpicker_hour_slider");
    moverSlider(sliderHandleHora, 123);

    // Minuto Fim
    sliderHandleMinuto = document.querySelector(".ui_tpicker_minute_slider");
    moverSlider(sliderHandleMinuto, 123);
};

function Titularidade(diag, prov) {
    HoraAtual();

    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (element1 !== null) {
        element1.click();
    }
    if (element2 !== null) {
        element2.click();
    }
    if (element3 !== null) {
        element3.click();
    }

    var diagn = document.getElementById("form1:diagnosticoBaixa");
    var provd = document.getElementById("form1:providenciaBaixa");

    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }
}

async function Revisao(vaz, conc, exec, resp, diag, prov, usuario, leitura, lacre, improc) {

    //Revisao(vazamento, concluido, executado, resposta, diag, prov, usu, lei, lacre, improcende)
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[" + vaz + "]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[" + conc + "]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[" + exec + "]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[" + resp + "]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (element1 !== null) {
        element1.click();
    }
    if (element2 !== null) {
        element2.click();
    }
    if (element3 !== null) {
        element3.click();
    }
    if (element4 !== null) {
        element4.click();
    }

    const diagn = document.getElementById("form1:diagnosticoBaixa");
    const provd = document.getElementById("form1:providenciaBaixa");
    const anexar = await waitForElement(taganexar);

    if (diagn !== null && diagn !== false) {
        diagn.value = diag;
    }
    if (provd !== null && provd !== false) {
        provd.value = prov;
    }

    if (vaz == 1) {
        const tipoVazamento = await waitForElement('#form1\\:tipoVazamento');
        if (tipoVazamento) {
            document.getElementById("form1:tipoVazamento_4").click();
        }
    }

    if (improc) {
        var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (improcedente !== null) {
            improcedente.click();
            const naoexec = await waitForElement('#form1\\:motivoNaoExecucao');
            if (naoexec) {
                document.getElementById("form1:motivoNaoExecucao_8").click();
            }
        }
    }
    else {
        var procedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (procedente !== null) {
            procedente.click();
        }
    }


    if (usuario && leitura) {
        const usu = await waitForElement(tagusuario);
        if (usu !== null) {
            usu.value = usuario;
        }
        const leit = await waitForElement(tagleitura);
        if (leit !== null) {
            leit.value = leitura;
        }
    }
    return;

}

async function waitForElement(selector) {
    const startTime = Date.now();
    const timeout = 2000; // Tempo limite de 5 segundos

    while (!document.querySelector(selector)) {
        if (Date.now() - startTime > timeout) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 100)); // Espera 100ms antes de verificar novamente
    }

    return document.querySelector(selector);
}

function AltTitAtual() { // Alteração para Titular Atual
    var titular = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[3]/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var inscricao = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var diag = 'Usuário(a) ' + titular + ' já consta como atual responsável financeiro(a) do imóvel de inscrição ' + inscricao + '. \nCaso queira solicitar a alteração para outra pessoa, a solicitação deve ser feita no cadastro desta, sendo vedada a alteração por solicitação de terceiros.';
    var prov = 'Para solicitação de alteração de titularidade de conta, é necessário que o requerente apresente documento que comprove vínculo com o imóvel, seja de propriedade como IPTU, escritura ou cessão de direitos, seja de locação com contrato de locação tendo firma reconhecida em cartório de locador e locatário ou assinatura digital válida. O documento e a solicitação devem estar em nome daquele que ficará como titular financeiro pelo imóvel e este não pode ter débitos em aberto junto à CAESB. Vale ressaltar que não é permitida a solicitação de alteração por terceiros ou por aqueles que já são os atuais titulares da conta.';
    Titularidade(diag, prov);
};

function AltRealizada() { //Alteração Realizada
    var titular = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[3]/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var inscricao = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var diag = 'SOLICITAÇÃO DE ALTERAÇÃO DE TITULARIDADE.';
    var prov = 'Prezado(a) ' + titular + ', informamos que sua solicitação de vinculação como responsável financeiro do imóvel de inscrição ' + inscricao + ' foi aceita, considerando a documentação apresentada. \nDesta forma, você passa a ser o responsável pelos pagamentos referentes a este imóvel. \nCaso o fornecimento de água esteja suspenso, é importante ressaltar que será necessária a abertura de uma solicitação de religação.';
    Titularidade(diag, prov);
};

function AltDebitos() { //Alteração com Débitos
    var titular = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[3]/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var insc = prompt('Digite as inscrições que possuem débitos (ex.: 123456, 654321 e 112233): ');
    var diag = 'Alteração não efetuada, cliente com débito junto a CAESB em outra(s) inscrição(ões): ' + insc + '.';
    var prov = 'Nova vinculação poderá ser feita mediante quitação do débito ou parcelamento.';
    Titularidade(diag, prov);
};

function AltFaltaDoc() { //Alteração Falta Documentos
    var titular = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[3]/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var inscricao = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var diag = 'Usuário(a) ' + titular + ' solicita vinculação como responsável financeiro(a) do imóvel de inscrição ' + inscricao + ', porém +++COMPLETAR+++';
    var prov = 'Para solicitação de alteração de titularidade de conta, é necessário que o requerente apresente documento que comprove vínculo com o imóvel, seja de propriedade como IPTU, escritura ou cessão de direitos, seja de locação com contrato de locação tendo firma reconhecida em cartório de locador e locatário ou assinatura digital válida. O documento e a solicitação devem estar em nome daquele que ficará como titular financeiro pelo imóvel e este não pode ter débitos em aberto junto à CAESB. Vale ressaltar que não é permitida a solicitação de alteração por terceiros ou por aqueles que já são os atuais titulares da conta.';
    Titularidade(diag, prov);
};

//Revisao(vazamento, concluido, executado, resposta, diag, prov, usu, lei, lacre, improcende)

function UsuarioOrientadoVazamento() { //Usuario Orientado Vazamento
    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');
    if ( lacre == "" ) {
        var diag = `Hidrômetro com bom funcionamento, leitura ${leitura} confirmada.\nOrientamos o(a) usuário(a) ${usuario} a verificar as instalações hidráulicas do imóvel, a fim de identificar qualquer vazamento que possa estar influenciando no faturamento.`;
    }
    else {
        var diag = `Hidrômetro com bom funcionamento, leitura ${leitura} confirmada, lacre ${lacre}.\nOrientamos o(a) usuário(a) ${usuario} a verificar as instalações hidráulicas do imóvel, a fim de identificar qualquer vazamento que possa estar influenciando no faturamento.`;
    }
    var prov = `Caso seja identificado um vazamento, é importante efetuar o registro fotográfico do local antes e depois da correção, além de providenciar o reparo imediato.\nApós o reparo, o usuário(a) deve encaminhar as fotos que comprovem a existência/correção do vazamento, juntamente com foto da numeração do hidrômetro e foto da leitura atual, em uma nova solicitação por meio do Autoatendimento no site da CAESB ou pelo Aplicativo.\nEssas medidas garantirão a revisão adequada das contas, conforme estabelecido pela Resolução 14/2011.`;

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, true);
};

function PortaoFechado() { //Portão fechado.
    var data = document.getElementById('form1:dataFimExecucao_input').value;
    //var diag = `Comunicamos que em ${data.split(' ')[0]} às ${data.split(' ')[1]} a CAESB esteve em seu imóvel para realizar vistoria. Informamos que não foi possível, pois o imóvel estava fechado e não havia ninguém no local.`;
    var diag = `Comunicamos que em ${data.split(' ')[0]} a CAESB esteve em seu imóvel para realizar vistoria. Informamos que não foi possível, pois o imóvel estava fechado e não havia ninguém no local.`;
    var prov = `Deixado aviso de comparecimento.`;

    Revisao(2, 2, 2, 1, diag, prov, false, false, false, true);
};

function SemVazamImprocedente() { //Sem Vazam. Improcedente

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');
    var refs = prompt('Caso tenha atualizado vencimento, informar refs. Ex. 10/2023, 11/2023 e 12/2023 \nCaso contrário deixar em branco.');
    if ( lacre == "" ) {
        var diag = 'Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente e a leitura ' + leitura + ' foi confirmada e não foi encontrado nenhum indício de vazamento no local. Diante disso, concluímos que as contas foram faturadas de acordo com o consumo registrado pelo hidrômetro.'
        }
    else {
        var diag = 'Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente e a leitura ' + leitura + ' foi confirmada. O lacre ' + lacre + ' está intacto e não foi encontrado nenhum indício de vazamento no local. Diante disso, concluímos que as contas foram faturadas de acordo com o consumo registrado pelo hidrômetro.';
    }
    if ( refs == "" ) {
        var prov = 'Informamos que, de acordo com as normas e regulamentos vigentes, não há nenhuma prerrogativa para a concessão de desconto nesta situação relatada.';
    }
    else {
        var prov = 'Informamos que, de acordo com as normas e regulamentos vigentes, não há nenhuma prerrogativa para a concessão de desconto nesta situação relatada.\n Atualizado vencimento da(s) conta(s) referência ' + refs + '.';
    }

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, true);
};

function VazInternNVisCol() { //Vaz. Interno

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');
    var vaz = prompt('Digite o local do vazamento: Ex. no ramal do quintal ');
    var vistoriante = prompt('Digite a matrícula do vistoriante: ');
    var conta = prompt('Digite a(s) conta(s): Ex. 01/2023, 02/2023 e 03/2023');
    if ( lacre == "" ) {
        var diag = 'Em vistoria o hidrômetro apresentou bom funcionamento, com leitura confirmada de ' + leitura + '. \nVazamento interno sanado, não visível e não coletado para o esgoto ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante;
    }
    else {
        var diag = 'Em vistoria o hidrômetro apresentou bom funcionamento, com leitura confirmada de ' + leitura + ', lacre ' + lacre + '. \nVazamento interno sanado, não visível e não coletado para o esgoto ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante;
    }

    var prov = 'Conta(s) referência ' + conta + ' revisada(s) conforme Resolução ADASA nº 14/2011.';

    Revisao(1, 1, 1, 1, diag, prov, usuario, leitura, lacre, false);
};

function LeituraInformada() { //Leitura informada

    HoraAtual();
    var leitura = prompt('Digite a leitura: ');
    var conta = prompt('Digite a conta: Ex. 01/2023');

    var diag = ('Usuário informa leitura ' + leitura + ' para conta referência ' + conta + ' faturada pela média devido a ocorrência impeditiva de leitura.');
    var prov = ('Conta referência ' + conta + ' refaturada conforme leitura informada pelo usuário.');

    Revisao(2, 1, 1, 1, diag, prov, '.', leitura, false, false);
};

function VazCoberto() { //Vaz Coberto

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');

    if ( lacre == "" ) {
        var diag = ('Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente, leitura ' +leitura + ' foi confirmada. Usuário informa que sanou vazamento, porém local já estava tampado/coberto, não sendo possível verificar o vazamento sanado.');
    }
    else {
        var diag = ('Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente, leitura ' +leitura + ' foi confirmada e lacre ' +lacre+ '. Usuário informa que sanou vazamento, porém local já estava tampado/coberto, não sendo possível verificar o vazamento sanado.');
    }

    var prov = ('A revisão de contas solicitada não pode ser concedida devido à falta de documentação comprobatória do conserto do vazamento imperceptível e/ou da realização da vistoria para verificação do mesmo. \nConforme a Resolução 014/2011 da ADASA, para obter o desconto mencionado, é necessário apresentar o termo de ocorrência de eliminação do vazamento imperceptível e comprovantes do material/serviço utilizado para reparar o vazamento. Alternativamente, é possível solicitar uma vistoria para verificar novamente o vazamento, desde que o mesmo esteja exposto para registro fotográfico. As fotos do conserto, juntamente com os comprovantes, podem ser apresentados em novo pedido de revisão pelo Autoatendimento no site da CAESB ou Aplicativo.')

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, true);
};

function ErroLeitura() { //Erro de leitura

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');
    var conta = prompt('Digite a(s) conta(s): Ex. 01/2023, 02/2023 e 03/2023');

    if ( lacre == "" ) {
        var diag = ('Hidrômetro com bom funcionamento, leitura ' +leitura+ ' confirmada. Houve erro de leitura.');
    }
    else {
        var diag = ('Hidrômetro com bom funcionamento, leitura ' +leitura+ ' confirmada, lacre ' +lacre+'. Houve erro de leitura.');
    }

    var prov = ('Conta referência ' +conta+ ' refaturada conforme consumo do imóvel');

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, false);
};

function AgendLeitura() { //Agendamento de leitura

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');
    var conta = prompt('Digite a conta: Ex. 01/2023');

    if ( lacre == "" ) {
        var diag = ('Hidrômetro com bom funcionamento, leitura ' +leitura+ ' confirmada. Vistoria de agendamento de leitura realizada para retirada de multa por impedimento de leitura.');
    }
    else {
        var diag = ('Hidrômetro com bom funcionamento, leitura ' +leitura+ ' confirmada, lacre ' +lacre+' . Vistoria de agendamento de leitura realizada para retirada de multa por impedimento de leitura.');
    }

    var prov = ('Conta referência ' +conta+ ' refaturada conforme consumo do imóvel e retirada multa de impedimento de leitura.');

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, false);
};

function AgendLeituraForaPrazo() { //Agendamento de leitura aberta fora do prazo

    var conta = prompt('Digite a conta: Ex. 01/2023');

    var diag = ('Informamos que em caso de ocorrência impeditiva de leitura, a conta de água é faturada pela média de consumo do imóvel dos últimos doze meses e quando ocorre dois ou mais impedimentos consecutivos passa a' +
                ' ser cobrada multa por impedimento de leitura.\n A multa de impedimento de leitura pode ser retirada mediante AGENDAMENTO de leitura no MESMO MÊS em que é lançada a multa, onde o usuário ao solicitar o ' +
                'agendamento informa a data e o período, matutino ou vespertino, para o qual gostaria que fosse realizada a vistoria, onde será coletada a leitura atual e feita a revisão de contas. ');

    var prov = ('Conta referência ' +conta+ ' mantida, pedido de revisão indeferido, pois foi solicitado o agendamento APÓS o faturamento da conta seguinte ao impedimento gerador da multa. \n' +
               'Salientamos ainda que o usuário tem a opção de solicitar o remanejamento do hidrômetro para fora do imóvel, dando acesso à leitura, ou se cadastrar na Auto Leitura pelo site da CAESB, sendo necessário informar a leitura mensalmente pelo site.');

    Revisao(2, 1, 1, 1, diag, prov, ' ', '0', false, false);
};

function VazVisCol() { //Vazamento visível e coletado

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var vaz = prompt('Digite o local do vazamento: Ex. na caixa de descarga ');
    var vistoriante = prompt('Digite a matrícula do vistoriante: ');
    var usuario = prompt('Digite o nome do usuario: ');

    if ( lacre == "" ) {
        var diag = ('Hidrômetro com bom funcionamento, leitura ' +leitura+ ' confirmada. Vazamento interno sanado, visível e coletado para o esgoto ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante);
    }

    else {
        var diag = ('Hidrômetro com bom funcionamento, leitura ' +leitura+ ' confirmada, lacre ' +lacre+' . Vazamento interno sanado, visível e coletado para o esgoto ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante);
    }

    var prov = ('Após analisarmos o seu pedido de revisão tarifária referente ao vazamento visível nas instalações hidráulicas da sua unidade usuária, verificamos que, de acordo com a Resolução ADASA nº 14/2011, Art. 118, o desconto sobre o consumo excedente só é aplicável quando há comprovação e subsequente eliminação de vazamento imperceptível nas instalações hidráulicas. Além disso, conforme o § 4º da mesma resolução, caso seja comprovado que o excesso de água não foi direcionado para a rede pública de esgotos sanitários, a tarifa de esgoto será calculada com base na média de consumo da unidade usuária. \nPortanto, devido ao fato de o vazamento ser visível e a água ter escoado para a rede de esgoto, não é possível conceder desconto tanto na tarifa de água quanto na de esgoto.');

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, true);
};

function NhidNConf() { // Nº Hid não confere - já atualizado
    HoraAtual()
    var hid = document.querySelector("#form1\\:tbHidro_data > tr:nth-child(1) > td:nth-child(1)").innerText;
    console.log(hid);
    var data = document.querySelector("#form1\\:tbHidro_data > tr:nth-child(1) > td:nth-child(2)").innerText;
    console.log(data);
    var diag = ('Hidrômetro '+hid+' foi substituído pela CAESB e cadastro já está atualizado.');
    var prov = ('Hidrômetro instalado em ' + data);

    Revisao(2, 2, 1, 2, diag, prov, '.', '0', false, true);
};

function VazNegado() { //Vaz.Negado Mais de 2 LS.

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');
    var vaz = prompt('Digite o local do vazamento: Ex. no ramal do quintal ');
    var vistoriante = prompt('Digite a matrícula do vistoriante: ');
    var conta = prompt('Digite a(s) conta(s) que já receberam LS: Ex. 01/2023, 02/2023 e 03/2023');

    if ( lacre == "" ) {
        var diag = ('Em vistoria o hidrômetro apresentou bom funcionamento, com leitura confirmada de ' + leitura + '. \nVazamento interno sanado, não visível e não coletado para o esgoto ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante);
    }
    else {
        var diag = ('Em vistoria o hidrômetro apresentou bom funcionamento, com leitura confirmada de ' + leitura + ', lacre ' + lacre + '. \nVazamento interno sanado, não visível e não coletado para o esgoto ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante);
    }

    var prov = ('Conforme o ART. 118, §5º da Resolução 014/2011 da ADASA, o desconto será aplicado em, no máximo, duas faturas mensais subsequentes que comprovadamente foram influenciadas pelo vazamento confirmado pelo prestador de serviços. Esse desconto está limitado a uma ocorrência de vazamento em um período de 12 (doze) meses. \nInformamos que a solicitação de revisão não procede, uma vez que já foi concedido desconto por vazamento na(s) conta(s) ' +conta+ '. \nAtualizado vencimento da conta xx/2023.');

    Revisao(1, 1, 1, 1, diag, prov, usuario, leitura, lacre, true);
};

function ReforcoFeitaHoje() { // Reforço feito hoje
    HoraAtual()
    var data = document.getElementById('form1:dataInicioExecucao_input').value;
    var diag = `OS principal baixada em ${data.split(' ')[0]} .`;
    var prov = (' ');

    Revisao(2, 2, 2, 2, diag, prov, false, false, false, true).then(async v => {
        const motivo = await waitForElement('#form1\\:motivoNaoExecucao_label');
        if (motivo) {
            document.getElementById("form1:motivoNaoExecucao_22").click();
        }
    });
};

function DescAutoLeitura() { // Descadastrado da auto leitura mes

    const modal = document.createElement('div');
    var opcao;
    modal.className = 'modal';
    modal.style.position = 'fixed';
    modal.style.zIndex = '9999';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.height = 'auto';
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 10vh;">
            <h3>Escolha uma opção</h3>
            <button id="opcao1">Duas ocorrências de autoleitura não informada</button>
            <button id="opcao2">Leitura não realizada em ABRIL</button>
            <button id="opcao3">Leitura não realizada em OUTUBRO</button>
        </div>
    `;

    modal.querySelector('#opcao1').addEventListener('click', function() {
        opcao = 'duasnaolidas';
        modal.remove();
        HoraAtual();
        var diag = 'Conforme informado no termo de autoleitura, em caso de não informação de autoleitura por dois meses seguidos, usuário é automaticamente descadastrado do sistema de autoleitura.';
        var prov = 'Usuário somente poderá se cadastrar novamente após 06 meses, como constante no Termo de Adesão da autoleitura.';
        Revisao(2, 1, 1, 1, diag, prov, false, false, false, true);
    });

    modal.querySelector('#opcao2').addEventListener('click', function() {
        opcao = 'abril';
        modal.remove();
        HoraAtual();
        var diag = 'Conforme informado no termo de autoleitura, nos meses de ABRIL e OUTUBRO a CAESB deverá necessariamente ter acesso ao hidrômetro para vistoria e leitura.\n' +
            'Como não houve acesso à leitura no mês de ' + opcao + ', usuário foi descadastrado da autoleitura automaticamente.';
        var prov = 'Usuário somente poderá se cadastrar novamente após 06 meses, como constante no Termo de Adesão da autoleitura.';
        Revisao(2, 1, 1, 1, diag, prov, false, false, false, true);
    });

    modal.querySelector('#opcao3').addEventListener('click', function() {
        opcao = 'outubro';
        modal.remove();
        HoraAtual();
        var diag = 'Conforme informado no termo de autoleitura, nos meses de ABRIL e OUTUBRO a CAESB deverá necessariamente ter acesso ao hidrômetro para vistoria e leitura.\n' +
            'Como não houve acesso à leitura no mês de ' + opcao + ', usuário foi descadastrado da autoleitura automaticamente.';
        var prov = 'Usuário somente poderá se cadastrar novamente após 06 meses, como constante no Termo de Adesão da autoleitura.';
        Revisao(2, 1, 1, 1, diag, prov, false, false, false, true);
    });

    document.body.appendChild(modal);
};

function AlteracaoCategoria() { // Alteração de categoria

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');
    var categoriaAtual = prompt('Digite a categoria anterior: ');
    var categoriaNova = prompt('Digite a nova categoria: ');

    var diag;
    if (lacre == "") {
        diag = 'Hidrômetro com leitura ' + leitura + ' e em bom funcionamento, abastece imóvel de categoria ' + categoriaNova + '.';
    } else {
        diag = 'Hidrômetro com leitura ' + leitura + ' e lacre ' + lacre + ' e em bom funcionamento, abastece imóvel de categoria ' + categoriaNova + '.';
    }

    var prov = 'Estivemos em seu endereço e constatamos alterações nos dados cadastrais deste imóvel. Diante do exposto e em atenção ao Artigo 70 da Resolução ADASA nº 14/2011, realizaremos a atualização em nosso sistema, conforme abaixo.\n' +
               'Alterado da categoria ' + categoriaAtual + ' para ' + categoriaNova + 'com efeito à partir do próximo faturamento.\n' +
               'Caso não concorde com esta alteração poderá solicitar uma revisão de dados cadastrais no site da CAESB, www.caesb.df.gov.br, após cadastro prévio.\n' +
               'Solicitações, serviços e informações podem ser obtidos por meio do aplicativo da CAESB, autoatendimento no site da CAESB, Central 115 ou unidades de atendimento presencial.';

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, false);
}

function AlteracaoUnidadesConsumo() { // Alteração de Unidades de Consumo

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');
    var unidadesConsumoAtual = prompt('Digite o nº de Unidades de Consumo anterior: ');
    var unidadesConsumoNova = prompt('Digite o novo nº de Unidades de Consumo: ');

    var diag;
    if (lacre == "") {
        diag = 'Hidrômetro com leitura ' + leitura + ' e em bom funcionamento, abastece imóvel com ' + unidadesConsumoNova + ' unidades de consumo.';
    } else {
        diag = 'Hidrômetro com leitura ' + leitura + ' e lacre ' + lacre + ' e em bom funcionamento, abastece imóvel com ' + unidadesConsumoNova + ' unidades de consumo.';
    }

    var prov = 'Estivemos em seu endereço e constatamos alterações nos dados cadastrais deste imóvel. Diante do exposto e em atenção ao Artigo 70 da Resolução ADASA nº 14/2011, realizaremos a atualização em nosso sistema, conforme abaixo.\n' +
               'Alterado de ' + unidadesConsumoAtual + ' unidades de consumo para ' + unidadesConsumoNova + ' unidades de consumo com efeito à partir do próximo faturamento.\n' +
               'Caso não concorde com esta alteração poderá solicitar uma revisão de dados cadastrais no site da CAESB, www.caesb.df.gov.br, após cadastro prévio.\n' +
               'Solicitações, serviços e informações podem ser obtidos por meio do aplicativo da CAESB, autoatendimento no site da CAESB, Central 115 ou unidades de atendimento presencial.';

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, false);
}


function DistribuicaoConsumo() { // Distribuição de Consumo

    const input = prompt('Copie e cole da FICHA a distribuição');
    // Regex para extrair as informações relevantes do input
    const refsRegex = /(\d{2}\/\d{4})(?:,|$)/g;
    const refsMatches = Array.from(input.matchAll(refsRegex), match => match[1]);
    const totalVolumeRegex = /volume total de (\d+m³)/;
    const totalVolumeMatch = input.match(totalVolumeRegex);
    const monthsRegex = /resultando em (\d+) meses/;
    const monthsMatch = input.match(monthsRegex);
    const firstMonthRegex = /sendo o primeiro de (\d+m³)/;
    const firstMonthMatch = input.match(firstMonthRegex);


    // Variáveis com as informações extraídas
    const refs = refsMatches.slice(-2); // Pega as duas últimas referências
    const totalVolume = totalVolumeMatch[1];
    const months = parseInt(monthsMatch[1]);
    const firstMonth = firstMonthMatch[1];

    // Frase 1
    const lastRef = refs[1];
    const previousMonths = refsMatches.length - 1;
    const frase1 = `Houve acúmulo de consumo na conta referência ${lastRef} por ocorrência impeditiva no(s) ${previousMonths} mes(es) anterior(es).`;

    // Frase 2
    const firstRef = refsMatches[0];
    const frase2 = `Conta referência ${lastRef} refaturada pela distribuição do consumo dos meses ${firstRef} a ${lastRef}, com consumo total de ${totalVolume} em ${months} meses.`;

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');

    if ( lacre == "" ) {
        var diag = ('Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente, leitura ' + leitura + ' foi confirmada. Não foi encontrado nenhum indício de vazamento no local. \n' + frase1);
    }
    else {
        var diag = ('Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente, leitura ' + leitura + ' foi confirmada e o lacre ' + lacre + ' está intacto. Não foi encontrado nenhum indício de vazamento no local. \n' + frase1);
    }

    var prov = frase2;

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, false);
};

function VazAbaixoLs() { // Vaz.Abaixo LS S/Esg

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre. Caso não tenha/violado, deixe em branco.');
    var usuario = prompt('Digite o nome do usuario: ');
    var vaz = prompt('Digite o local do vazamento: Ex. no ramal do quintal ');
    var vistoriante = prompt('Digite a matrícula do vistoriante: ');
    var conta = prompt('Digite a(s) conta(s) que estão abaixo do LS: Ex. 01/2023, 02/2023 e 03/2023');

    if ( lacre == "" ) {
        var diag = ('Em vistoria o hidrômetro apresentou bom funcionamento, com leitura confirmada de ' + leitura + '. \nVazamento interno sanado, não visível ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante);
    }
    else {
        var diag = ('Em vistoria o hidrômetro apresentou bom funcionamento, com leitura confirmada de ' + leitura + ', lacre ' + lacre + '. \nVazamento interno sanado, não visível ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante);
    }


    var prov = ('Conforme ART. 118, §3º da resolução 014/2011 da ADASA o desconto na tarifa de água será no volume que ultrapassar o Limite Superior, sendo este 80% do consumo médio dos últimos 12 meses do imóvel. Conta(s) referência ' + conta + ' com consumo abaixo do Limite Superior.');

    Revisao(1, 1, 1, 1, diag, prov, usuario, leitura, lacre, true);
};

async function TrocaHD() { // Troca de HD

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre atual: ');
    var usuario = prompt('Digite o nome do usuario: ');
    var motivo = prompt('Digite o motivo da troca: (parado, danificado, etc)');
    var hdnovo = prompt('Digite o novo HIDRÔMETRO: (Y20S123456) ');
    var lacrenovo = prompt('Digite o novo LACRE: ');
    var hd = document.querySelector("#form1\\:tbHidro_data > tr:nth-child(1) > td:nth-child(1)").innerText;

    if (lacre == "") {
        diag = ('Em vistoria verificamos que o hidrômetro ' + hd + ' está ' + motivo + ' com leitura ' + leitura + '.');
    } else {
        diag = ('Em vistoria verificamos que o hidrômetro ' + hd + ' está ' + motivo + ' com leitura ' + leitura + ' e lacre ' + lacre + '.');
    }
    var prov = ('Hidrômetro substituído pelo ' + hdnovo + ', lacre ' + lacrenovo + ' e leitura 0.');

    Revisao(2, 1, 1, 1, diag, prov, usuario, leitura, lacre, true);
    /*
    PrimeFaces.ab({s:'form1:tbHidro:0:j_idt638',p:'form1:tbHidro:0:j_idt638',u:'formSubstituicaoHidrometro',onco:function(xhr,status,args){PF('dlgSubstituicaoHidrometro').show();}});

    const sub = await waitForElement('#formSubstituicaoHidrometro\\:pnlHidAntigo_header > span:nth-child(1)');
    var nleit = document.getElementById("#formSubstituicaoHidrometro\\:j_idt1144");
    var situ = document.getElementById("formSubstituicaoHidrometro:novaSitu_8");
    var pesqhd = document.evaluate("/html/body/div[22]/div[2]/form[2]/div/div[2]/table/tbody/tr/td[9]/button/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (nleit !== null) {
        nleit.value = leitura;
    }
    if (situ) {
        situ.click();
    }
    if (pesqhd) {
        pesqhd.click();
        const nhd = await waitForElement('#formPesquisarHidrometro\\:j_idt1335');
        nhd.value = hdnovo;
        const pesq = document.evaluate("/html/body/div[22]/div[2]/form[1]/span/table/tbody/tr/td[2]/table/tbody/tr/td/button/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        const check = await waitForElement('/html/body/div[22]/div[2]/form[2]/div/div[2]/table/tbody/tr/td[9]/button/span[1]');
        check.click();
    }
    var leitn = document.getElementByID('#formSubstituicaoHidrometro\\:j_idt1159').value = 0;
    */
};

function Leit042023() { // Vaz.Abaixo LS S/Esg
    HoraAtual();
    var diag = ('Conta faturada pela média por ocorrência 98 - Sem Retorno de Faturamento. Já normalizado e conta paga.')

    Revisao(2, 2, 2, 2, diag, '', false, false, false, true);
};

function UsuarioDescadastr() { // Tarifa Social - Usuario Descadastr.
    HoraAtual();
    var data = prompt('Informe a data que usuário foi descadastrado (ficha): ');
    var diag = ('Para concessão da tarifa social, é necessário que o CPF do beneficiário conste do relatório de integrantes do CadÚnico encaminhado pela SEDES e que a renda média familiar seja igual ou inferior a R$210,00 (duzentos e dez reais), caracterizando-se como família pobre ou extremamente pobre. \nCliente revogado por não estar mais nos critérios estabelecidos de acordo com informações recebidas da SEDES/GDF em ' + data + '.');
    var prov = ('Informamos que o cadastro na tarifa social depende exclusivamente das informações encaminhadas pela SEDES/GDF e CPF do(a) usuário(a) não consta no último relatório recebido pela CAESB - Caso necessário procurar o CRAS ou SEDES para atualização cadastral. \nA alteração para tarifa social é realizada de forma automática caso usuário esteja vinculado a apenas um imóvel.');
    Revisao(2, 1, 1, 1, diag, prov, false, false, false, true);
};

function MultaImpCorte() { //Multa de impedimento de corte - negado
    HoraAtual();
    var diag = `Comunicamos que, de acordo com as normas estabelecidas na Resolução ADASA nº 03/2012 (atualizada pela Resolução nº 21/2023) e na Resolução ADASA nº 11/2014, bem como na Cláusula Oitava deste, qualquer impedimento ao acesso ao  padrão de ligação de água, incluindo o cavalete e o hidrômetro para a realização da leitura, vistoria preventiva ou para a suspensão do fornecimento de água constitui uma infração passível de penalidade.
                \nNesse sentido, destacamos que o prestador de serviços está autorizado a aplicar a penalidade de multa sem a necessidade de iniciar procedimentos adicionais quando ocorrer impedimento ao acesso ao hidrômetro para a suspensão do fornecimento de água, conforme estipulado no artigo 31 da Resolução ADASA nº 03/2012. A multa a ser aplicada será calculada com base nos critérios estabelecidos no artigo 5º-C da mesma resolução.`;
    var prov = `Alertamos que o não pagamento das contas constitui descumprimento contratual, sujeitando o usuário à suspensão do serviço de abastecimento de água, conforme previsto no artigo 82, §3º, e no artigo 121, inciso I, da Resolução ADASA nº 11/2014, onde o usuário é notificado mensalmente nas contas de consumo mensal sobre as contas em aberto no imóvel e a possibilidade de corte em caso de permanência no inadimplemento.
                \nPedido de revisão indeferido, conta mantida.`;

    Revisao(2, 1, 1, 1, diag, prov, '.', '0', false, true);
};

function ForaDaLista() { // Tarifa Social - Fora da lista
    HoraAtual();
    var diag = ('Para concessão da tarifa social, é necessário que o CPF do beneficiário conste do relatório de integrantes do CadÚnico encaminhado pela SEDES e que a renda média familiar seja igual ou inferior a R$210,00 (duzentos e dez reais), caracterizando-se como família pobre ou extremamente pobre.');
    var prov = ('Informamos que o cadastro na tarifa social depende exclusivamente das informações encaminhadas pela SEDES/GDF e CPF do(a) usuário(a) não consta no último relatório recebido pela CAESB - Caso necessário procurar o CRAS ou SEDES para atualização cadastral. \nA alteração para tarifa social é realizada de forma automática caso usuário esteja vinculado a apenas um imóvel.');
    Revisao(2, 1, 1, 1, diag, prov, false, false, false, true);
};

function UsuarioJaTemTarSocial() { // Tarifa Social - Usuário já tem tar. social
    HoraAtual();
    var inscricao = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var diag = ('Informamos que o imóvel de inscrição ' + inscricao + ' já possui o benefício de tarifa social.');
    var prov = ('Salientamos que para concessão da tarifa social, é necessário que o CPF do beneficiário conste do relatório de integrantes do CadÚnico encaminhado pela SEDES e que a renda média familiar seja igual ou inferior a R$210,00 (duzentos e dez reais), caracterizando-se como família pobre ou extremamente pobre. O cadastro na tarifa social depende exclusivamente das informações encaminhadas pela SEDES/GDF e a alteração para tarifa social é realizada de forma automática caso usuário esteja vinculado a apenas um imóvel.');
    Revisao(2, 1, 1, 1, diag, prov, false, false, false, true);
};

function UsuarioVinculadoTarSocial() { // Tarifa Social - Usuário vinculado
    HoraAtual();
    var inscricao = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var diag = ('Usuário é beneficiário de tarifa social e solicita vinculação do imóvel de inscrição ' + inscricao + ' para o benefício.');
    var prov = ('Imóvel selecionado para concessão de tarifa social, alteração terá efeito à partir do próximo faturamento.');
    Revisao(2, 1, 1, 1, diag, prov, false, false, false, true);
};

function CltAusenteVistRealizada() { //Cliente Ausente - Vistoria Realizada

    var leitura = prompt('Digite a leitura: ');
    var data = document.getElementById('form1:dataFimExecucao_input').value;

    var diag = `Comunicamos que em ${data.split(' ')[0]} a CAESB esteve em seu imóvel para realizar vistoria, porém não havia ninguém no local para acompanhar a vistoria.`;
    var prov = 'Acesso ao hidrômetro, com leitura ' +leitura+ ' confirmada.  Caso necessário, realizar novo pedido de vistoria em nosso site (https://www.caesb.df.gov.br/portal-servicos/) ou aplicativo e caso não fique ninguém no imóvel solicitar vistoria com agendamento, onde poderá escolher o dia e o período, matutino ou vespertino, para realização da vistoria, sendo cobrada uma taxa de R$ 35,21 no próximo faturamento.';

    Revisao(2, 1, 1, 1, diag, prov, 'ausente', leitura, false, true);
};

function Proprietario() { // Exec.Cons.Final - Proprietario
    HoraAtual();
    var data = prompt('Informe a data que houve o corte: ');
    var leit = prompt('Informe a leitura final: ');
    var diag = ('Corte realizado em ' + data + ', com leitura final de ' + leit + '.');
    var prov = ('Atual titular é proprietário e solicitou apenas a desativação, não sendo registrada a saída.');
    Revisao(2, 1, 2, null, diag, prov, false, false, false, false);
};

function InqSemCons() { // Exec.Cons.Final - Inquilino sem Consumo Final
    HoraAtual();
    var data = prompt('Informe a data que houve o corte: ');
    var leit = prompt('Informe a leitura final: ');
    var diag = ('Corte realizado em ' + data + ', com leitura final de ' + leit + '.');
    var prov = ('Registrada saída do(a) usuário(a) e sem conta de consumo final.');
    Revisao(2, 1, 1, null, diag, prov, false, false, false, true);
};

function InqConsFinal() { // Exec.Cons.Final - Inquilino com Consumo Final
    HoraAtual();
    var data = prompt('Informe a data que houve o corte: ');
    var leit = prompt('Informe a leitura final: ');
    var diag = ('Corte realizado em ' + data + ', com leitura final de ' + leit + '.');
    var prov = ('Registrada saída do(a) usuário(a) e gerada conta com consumo final do imóvel.');
    Revisao(2, 1, 1, null, diag, prov, false, false, false, true);
};

function CorteNExec() { // Exec.Cons.Final - Corte não realizado
    HoraAtual();
    var data = prompt('Informe a data que houve a tentativa de corte: ');
    var diag = ('Tentativa de corte pela equipe da CAESB em ' + data + ', porém sem acesso ao hidrômetro para execução do serviço.');
    var prov = ('Conforme informado no Termo de Solicitação assinado pelo usuário a rescisão contratual e consequente suspensão do faturamento somente será efetivada após a suspensão definitiva dos serviços de abastecimento de água, onde deve ser viabilizada mediante a concessão de acesso ao padrão de ligação.');
    Revisao(2, 1, 1, null, diag, prov, false, false, false, true);
};

function VazDepoisCavalete() { //Vaz depois cavalete

    HoraAtual();
    var OSC = prompt('Informe a OSC de conserto de cavalete: ');
    var data = prompt('Informe a data do conserto.');
    var conta = prompt('Digite a(s) conta(s): Ex. 01/2023. \nDeixe em branco se não houve revisão');
    var diag = 'Vazamento após o hidrômetro sanado pela CAESB em ' +data+ ' pela OSM ' +OSC+ '.';

    if ( conta == "" ) {
        var prov = 'Contas com consumo dentro da média do imóvel.';
    }
    else {
        var prov = 'Conta(s) referência ' + conta + ' revisada(s) conforme Resolução ADASA nº 14/2011.';
    }


    Revisao(1, 1, 1, 1, diag, prov, '.', '0', null, false).then(async v => {
        const vaz = await waitForElement('#form1\\:tipoVazamento');
        if (vaz) {
            document.getElementById("form1:tipoVazamento_2").click();
        }
    });
};


function AbrirAnexos() { //Abrir todos os anexos.
    var form2 = 'formOsAnexoBean';
    //const count1 = countElements("formOsAnexoBean:abasAtendimento:j_idt1741:", "j_idt1747_menu", 20);
    //const count2 = countElements("formOsAnexoBean:abasAtendimento:tableAtendimento:", "j_idt1737_menu", 20);
    //openAttachments("formOsAnexoBean:abasAtendimento:j_idt1741:", "j_idt1748", count1, form2);
    //openAttachments("formOsAnexoBean:abasAtendimento:tableAtendimento:", "j_idt1740", count2, form2);
    const count1 = countElements(prefix1, menuId1, 20);
    const count2 = countElements(prefix2, menuId2, 20);
    openAttachments(prefix1, abrir1, count1, form2);
    openAttachments(prefix2, abrir2, count2, form2);
};

function AbrirAnexosAtendimento() {
    var form2 = 'abas:formAtendimentoAnexo';
    //const count1 = countElements("abas:formAtendimentoAnexo:j_idt649:", "j_idt655_menu", 20);
    //const count2 = countElements("abas:formAtendimentoAnexo:j_idt659:", "j_idt665_menu", 20);
    //openAttachments("abas:formAtendimentoAnexo:j_idt649:", "j_idt658", count1, form2);
    //openAttachments("abas:formAtendimentoAnexo:j_idt659:", "j_idt666", count2, form2);
    const count3 = countElements(prefix3, menuId3, 20);
    const count4 = countElements(prefix4, menuId4, 20);
    openAttachments(prefix3, abrir3, count3, form2);
    openAttachments(prefix4, abrir4, count4, form2);
}

function countElements(baseId, buttonId, maxIndex) {
    let count = 0;
    for (let i = 0; i <= maxIndex; i++) {
        const id = `${baseId}${i}:${buttonId}`;
        const element = document.getElementById(id);
        if (element) {
            count++;
        }
    }
    return count;
}

function openAttachments(baseId, buttonId, count, form2) {
    for (let i = 0; i < count; i++) {
        setTimeout(function(i) {
            const id = `${baseId}${i}:${buttonId}`;
            const form = document.getElementById(form2);
            form.target = "_blank";
            PrimeFaces.addSubmitParam(form2, { [id]: id }).submit(form2);
            console.log("i1: ", i);
        }, 500 * i, i);
    }
}


function PopUpRefatCred() {
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
        { categoria: 'Comercial', tarifacao: '06/2024', faixa: 10000, valor: 18.31 }
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
            { label: 'Tarifação', id: 'tarifacao', type: 'select', options: ['06/2024', '08/2023', '01/2023', '09/2022', '06/2021'], default: '06/2024' }
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
        const resultadoEsgotoMedido = resultadoAguaMedido * (esgoto / 100);
        const resultadoEsgotoRefat = calcValorConta(media, categoria, tarifacao, unidadesConsumo, tabela) * (esgoto / 100);
    
        displayResults(resultadoAguaMedido, resultadoAguaRefat, resultadoEsgotoMedido, resultadoEsgotoRefat, consumo, esgoto, ls, media, consumoRefat, osc, contaRef, tipoVazamento);
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

    function displayResults(resultadoAguaMedido, resultadoAguaRefat, resultadoEsgotoMedido, resultadoEsgotoRefat, consumo, esgoto, ls, media, consumoRefat, osc, contaRef, tipoVazamento) {
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
                        <td style="padding: 3px; font-size: 11px;"><b>${resultadoAguaMedido.toFixed(2)}</b> (${consumo}m³)</td>
                        <td style="padding: 3px; font-size: 11px;"><b>${resultadoEsgotoMedido.toFixed(2)}</b> (${consumo}m³)</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px; font-size: 11px;"><strong>Refat:</strong></td>
                        <td style="padding: 3px; font-size: 11px;"><b>${resultadoAguaRefat.toFixed(2)}</b> (${consumoRefat}m³)</td>
                        <td style="padding: 3px; font-size: 11px;"><b>${resultadoEsgotoRefat.toFixed(2)}</b> (${media}m³)</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px; font-size: 11px;"><strong>Desconto:</strong></td>
                        <td style="padding: 3px; font-size: 11px;"><b>${descontoAgua.toFixed(2)}</b></td>
                        <td style="padding: 3px; font-size: 11px;"><b>${descontoEsgoto.toFixed(2)}</b></td>
                    </tr>
                </table>
            </div>
            <div style="margin-top: 10px; font-size: 11px; text-align: left">
                Vazamento <b>${tipoVazamento}</b> conforme OSC <b>${osc}</b> conta <b>${contaRef}</b> já paga.<br>
                Refaturamento pel${tipoVazamento === 'Interno' && ls < consumo ? 'o LS e MÉDIA' : 'a MÉDIA'}<br>
                ${descontoAgua > 0 ? `Valor de água: ${resultadoAguaMedido.toFixed(2)} (${consumo}m³) - ${resultadoAguaRefat.toFixed(2)} (${consumoRefat}m³) = ${descontoAgua.toFixed(2)}<br>` : ''}
                ${descontoEsgoto > 0 ? `Valor de esgoto: ${resultadoEsgotoMedido.toFixed(2)} (${consumo}m³) - ${resultadoEsgotoRefat.toFixed(2)} (${media}m³) = ${descontoEsgoto.toFixed(2)}` : ''}
            </div>

        `;
    }

    createOptionsWindow();
}

PopUpRefatCred();