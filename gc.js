// ==UserScript==
// @name        HelpGCOM
// @namespace   https://sistemas.caesb.df.gov.br/gcom/
// @match       *sistemas.caesb.df.gov.br/gcom/app/atendimento/os/baixa*
// @match       *sistemas.caesb/gcom/app/atendimento/os/baixa*
// @version     0.70
// @grant       none
// @license     MIT
// @description Auxiliar para trabalhos no GCOM!
// ==/UserScript==


var myWidget = $('<div id="my-widget"></div>');
myWidget.css({
    'position': 'fixed',
    'top': '10%',
    'right': '10px',
    'background-color': '#white',
    'border': '1px solid #ddd',
    'padding': '10px',
    'box-shadow': '0 2px 5px rgba(0, 0, 0, 0.2)',
    'font-size': '14px',
    'font-family': 'Arial, sans-serif',
    'z-index': '9999',
    'width': '200px',
    'border-radius': '5px'
});

// Adiciona evento de mouse no widget
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

// Remove evento de mousemove do body quando soltar o botão do mouse
$('body').mouseup(function() {
    $('body').off('mousemove');
});

var sectionTitle = $('<div style="font-weight: bold; margin-bottom: 10px; color: #333; cursor: pointer;">--- TITULARIDADE ---</div>');
var button2 = $('<button>Alteração para Titular Atual</button>');
var button3 = $('<button>Alteração Realizada</button>');
var button4 = $('<button>Alteração com Débitos</button>');
var button5 = $('<button>Alteração Falta Documentos</button>');
var button7 = $('<button>Abrir todos os anexos</button>');
var sectionTitle2 = $('<div style="font-weight: bold; margin-bottom: 10px; color: #333; cursor: pointer;">--- REVISAO DE CONTAS ---</div>');
var button8 = $('<button>Usuario Orientado Vazamento</button>');
var button9 = $('<button>Portão fechado</button>');
var button10 = $('<button>Sem Vazam. Improcedente</button>');
var button11 = $('<button>Vazamento Interno Ñ Vis/Col</button>');
var button12 = $('<button>Leitura informada pelo usuario</button>');
var button13 = $('<button>Vazamento Coberto</button>');
var button14 = $('<button>Erro de leitura</button>');
var button15 = $('<button>Agendamento de leitura</button>');
var button16 = $('<button>Vazamento Visivel/Coletado</button>');
var button17 = $('<button>NºHid.ñ conf. já atualizado</button>');
var button18 = $('<button>Vaz.Negado mais de 2 LS</button>');
var button20 = $('<button>Distribuição de Consumo</button>');
var button21 = $('<button>Vaz.Abaixo LS S/Esg</button>');
var button22 = $('<button>Troca de HD**</button>');
var sectionTitle3 = $('<div style="font-weight: bold; margin-bottom: 10px; color: #333; cursor: pointer;">--- EXTRAS ---</div>');
var button1 = $('<button>Colocar Hora Atual</button>');
var button6 = $('<button>Anexar arquivos</button>');
var button19 = $('<button>Reforço feita hoje</button>');
var credits = $('<div style="font-size: 8px; text-align: right; margin-top: 10px;">Ver. 0.70 - Feito por Willian Verri</div>');

myWidget.append(sectionTitle, button2, button3, button4, button5, button7, sectionTitle2, button8, button9, button10, button11, button12, button13, button14, button15, button16, button17, button18, button20, button21, button22, sectionTitle3, button1, button6, button19, credits);

myWidget.find('button').css({
  'background-color': '#0b61a4',
  'margin-bottom': '5px',
  'display': 'none',
  'width': '100%',
  'color': 'white',
  'border': 'none',
  'padding': '5px 10px',
  'text-align': 'center',
  'text-decoration': 'none',
  //'display': 'inline-block',
  'font-size': '12px',
  'font-weight': 'bold',
  'border-radius': '5px'
});

myWidget.find('div[style*="font-weight: bold"]').click(function() {
  $(this).nextUntil('div').filter('button').slideToggle();
});


$('body').append(myWidget);

//Função de digitar a hora atual na tela de baixa
(function() {
    var checkExist = setInterval(function() {
        if ($('#ui-datepicker-div').is(':visible')) {
            // Adicione o campo de texto ao lado do elemento de slider, se ainda não foi adicionado
            var sliderHandles = document.querySelectorAll(".ui-slider-handle");
            if (!sliderHandles[0].nextSibling || sliderHandles[0].nextSibling.tagName !== 'INPUT') {
                var textField = document.createElement("input");
                textField.type = "text";
                textField.style.marginLeft = "150px";
                textField.setAttribute("pattern", "[0-9]{2}:[0-9]{2}");
                textField.setAttribute("maxlength", "5");
                sliderHandles[0].parentNode.insertBefore(textField, sliderHandles[0].nextSibling);
                // Adicione o event listener para o evento "keydown" na caixa de texto
                textField.addEventListener("input", function() {
                    // Pegue o valor digitado e adicione os ":" nos lugares corretos
                    var valor = this.value.replace(/\D/g, '').substring(0,4);
                    var hora = valor.substring(0,2);
                    var minuto = valor.substring(2);
                    this.value = hora + ":" + minuto;
                });
                textField.addEventListener("keydown", function(event) {
                    // Verifique se a tecla pressionada é a tecla "Enter"
                    if (event.keyCode === 13) {
                        // Pegue o valor digitado e separe em horas e minutos
                        var valor = this.value.split(":");
                        var hora = valor[0];
                        var minuto = valor[1];
                        // Chame as funções desejadas
                        sliderHora(hora);
                        sliderMinuto(minuto);
                        // Coloque o foco novamente no campo de texto
                        this.focus();
                    }
                });
            }
            // Adicione o input de data ao calendário
            const table = document.querySelector('#ui-datepicker-div .ui-datepicker-calendar');
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Digite a data dd/mm/aaaa só num.';
            input.addEventListener('input', () => {
                let value = input.value.replace(/\D/g, ''); // remove todos os caracteres que não são números
                if (value.length > 8) value = value.slice(0, 8); // limita a 8 caracteres (ddmmaaaa)
                value = value.replace(/(\d{2})(\d)/, '$1/$2'); // adiciona a primeira barra após os primeiros dois números
                value = value.replace(/(\d{2})(\d)/, '$1/$2'); // adiciona a segunda barra após os próximos dois números
                input.value = value;
            });
            input.addEventListener('change', () => {
                const [dia, mes, ano] = input.value.split('/');
                const today = new Date();
                const selectAno = document.querySelector('#ui-datepicker-div .ui-datepicker-year');
                selectAno.value = ano ? ano : today.getFullYear().toString();
                selectAno.dispatchEvent(new CustomEvent('change', { bubbles: true }));
                const selectMes = document.querySelector('#ui-datepicker-div .ui-datepicker-month');
                const maxDia = new Date().getDate(); // máximo de dias no mês selecionado
                let diaSelecionado = parseInt(dia);
                if (diaSelecionado > maxDia) {
                    console.log(diaSelecionado + ' > ' + maxDia);
                    selectMes.value = today.getMonth() - 1; // seleciona o mês anterior
                    console.log(selectMes.value);
                    selectMes.dispatchEvent(new CustomEvent('change', { bubbles: true }));
                } else {
                    selectMes.value = mes ? mes - 1 : today.getMonth();
                    selectMes.dispatchEvent(new CustomEvent('change', { bubbles: true }));
                }

                const elementos = document.querySelectorAll('[data-month="' + selectMes.value + '"][data-year="' + selectAno.value + '"] a');
                for (let i = 0; i < elementos.length; i++) {
                    if (parseInt(elementos[i].textContent) === diaSelecionado) {
                        elementos[i].click();
                        break;
                    }
                }
                textField.focus();
            });

            input.addEventListener('keyup', function(event) {
                if (event.keyCode === 13) {
                    setTimeout(function() {
                        textField.focus();
                        document.querySelector(".ui-slider-handle:first-child").nextSibling.focus();
                    }, 300);
                }
            });

            //document.querySelector(".ui-slider-handle:first-child").nextSibling.focus();
            if (!table.previousSibling || table.previousSibling.tagName !== 'INPUT') {
                if (table.parentNode === null) {
                    document.body.insertBefore(input, table);
                    input.focus();
                } else {
                    table.parentNode.insertBefore(input, table);
                    input.focus();
                }
            }
        }
    }, 100);
})();

// Adicione ações aos botões
button1.click(function() { //Colocar Hora Atual
    var data = new Date();
    var hora = data.getHours();
    var minuto = data.getMinutes();
    var hinicio;
    var minicio;

    if (minuto < 10) {
        hinicio = (123 * (hora - 1)) / hora;
        minicio = 112;
    } else {
        hinicio = 123;
        minicio = (123 * (minuto - 10)) / minuto;
    }

    //clica data inicio
    document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td/span/button/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

    // Hora Inicio
    let sliderHandle = document.querySelector(".ui_tpicker_hour_slider");

    // simulate a mouse click and drag event on the slider handle to move it to 50%
    let event = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    event = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + hinicio,
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    event = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2) + (sliderHandle.parentElement.offsetWidth * 0.5),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    // Minuto Inicio
    sliderHandle = document.querySelector(".ui_tpicker_minute_slider");

    // simulate a mouse click and drag event on the slider handle to move it to 50%
    event = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    event = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + minicio,
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);


    event = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2) + (sliderHandle.parentElement.offsetWidth * 0.5),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    //clica data Fim
    document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/span/button/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

    // Hora Fim
    sliderHandle = document.querySelector(".ui_tpicker_hour_slider");

    // simulate a mouse click and drag event on the slider handle to move it to 50%
    event = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    event = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + 123,
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    event = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2) + (sliderHandle.parentElement.offsetWidth * 0.5),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    // Minuto Fim
    sliderHandle = document.querySelector(".ui_tpicker_minute_slider");

    // simulate a mouse click and drag event on the slider handle to move it to 50%
    event = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    event = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + 123,
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);


    event = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2) + (sliderHandle.parentElement.offsetWidth * 0.5),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

});

button2.click(function() { // Alteração para Titular Atual
    button1.click()

    //pega o nome do titular
    var titular = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[3]/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    titular = titular.textContent;
    //pega a inscrição
    var inscricao = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    inscricao = inscricao.textContent;

    var diag = ('Usuário(a) ' +titular+ ' já consta como atual responsável financeiro(a) do imóvel de inscrição ' +inscricao+ '. \nCaso queria solicitar a alteração para outra pessoa, a solicitação deve ser feita no cadastro desta, sendo vedada a alteração por solicitação de terceiros.')
    var prov = ('Para solicitação de alteração de titularidade de conta, é necessário que o requerente apresente documento que comprove vínculo com o imóvel, seja de propriedade como IPTU, escritura ou cessão de direitos, seja de locação com contrato de locação tendo firma reconhecida em cartório de locador e locatário ou assinatura digital válida. O documento e a solicitação devem estar em nome daquele que ficará como titular financeiro pelo imóvel e este não pode ter débitos em aberto junto à CAESB. Vale ressaltar que não é permitida a solicitação de alteração por terceiros ou por aqueles que já são os atuais titulares da conta.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
    if (element1 !== null) {
        element1.click();
    }
    if (element2 !== null) {
        element2.click();
    }
    if (element3 !== null) {
        element3.click();
    }

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

});

button3.click(function() { //Alteração Realizada
    button1.click()

    //pega o nome do titular
    var titular = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[3]/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    titular = titular.textContent;
    //pega a inscrição
    var inscricao = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    inscricao = inscricao.textContent;

    var diag = ('SOLICITAÇÃO DE ALTERAÇÃO DE TITULARIDADE.')
    var prov = ('Prezado(a) ' +titular+ ', informamos que sua solicitação de vinculação como responsável financeiro do imóvel de inscrição ' +inscricao+ ' foi aceita, considerando a documentação apresentada. \nDesta forma, você passa a ser o responsável pelos pagamentos referentes a este imóvel. \nCaso o fornecimento de água esteja suspenso, é importante ressaltar que será necessária a abertura de uma solicitação de religação.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
    if (element1 !== null) {
        element1.click();
    }
    if (element2 !== null) {
        element2.click();
    }
    if (element3 !== null) {
        element3.click();
    }

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }
});

button4.click(function() { //Alteração com Débitos
    button1.click()

    //pega o nome do titular
    var titular = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[3]/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    titular = titular.textContent;
    //pega a inscrição
    var inscricao = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    inscricao = inscricao.textContent;

    var insc = prompt('Digite as inscrições que possuem débitos (ex.: 123456, 654321 e 112233): ');

    var diag = ('Alteração não efetuada, cliente com débito junto a CAESB em outra(s) inscrição(ões): ' +insc+ '.')
    var prov = ('Nova vinculação poderá ser feita mediante quitação do débito ou parcelamento.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
    if (element1 !== null) {
        element1.click();
    }
    if (element2 !== null) {
        element2.click();
    }
    if (element3 !== null) {
        element3.click();
    }

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }
});

button5.click(function() { //Alteração Falta Documentos
    button1.click()

    //pega o nome do titular
    var titular = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[3]/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    titular = titular.textContent;
    //pega a inscrição
    var inscricao = document.evaluate("/html/body/div[8]/div/form[3]/span/div[1]/div[2]/table[1]/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    inscricao = inscricao.textContent;

    var diag = ('Usuário(a) ' +titular+ ' solicita vinculação como responsável financeiro(a) do imóvel de inscrição ' +inscricao+ ', porém +++COMPLETAR+++')
    var prov = ('Para solicitação de alteração de titularidade de conta, é necessário que o requerente apresente documento que comprove vínculo com o imóvel, seja de propriedade como IPTU, escritura ou cessão de direitos, seja de locação com contrato de locação tendo firma reconhecida em cartório de locador e locatário ou assinatura digital válida. O documento e a solicitação devem estar em nome daquele que ficará como titular financeiro pelo imóvel e este não pode ter débitos em aberto junto à CAESB. Vale ressaltar que não é permitida a solicitação de alteração por terceiros ou por aqueles que já são os atuais titulares da conta.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
    if (element1 !== null) {
        element1.click();
    }
    if (element2 !== null) {
        element2.click();
    }
    if (element3 !== null) {
        element3.click();
    }

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }
});

button6.click(function() { // Anexar arquivos (não funcional)

    try {
        document.evaluate("/html/body/div[7]/div/div/div[1]/form/button[2]/span[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); //botão anexar
    } catch(e) {
        document.evaluate("/html/body/div[4]/div[2]/button/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); //botão anexar //botão OK de erro /html/body/div[4]/div[2]/button/span
        document.evaluate("/html/body/div[7]/div/div/div[1]/form/button[2]/span[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); //botão anexar //botão anexar /html/body/div[7]/div/div/div[1]/form/button[2]/span[2]
    }
    console.log("2 - Tela anexar OS");
    //espera abrir tela de Anexar Ordem
    try {
        var element = document.evaluate("/html/body/div[31]/div[2]/form/div/div/div[1]/div/div[2]/button/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); //botão + /html/body/div[31]/div[2]/form/div/div/div[1]/div/div[2]/button/span[1]
    } catch(e) {
        document.evaluate("/html/body/div[7]/div/div/div[1]/form/button[2]/span[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); //botão anexar
        element = document.evaluate("/html/body/div[31]/div[2]/form/div/div/div[1]/div/div[2]/button/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); //botão +
    }
    document.evaluate("/html/body/div[31]/div[2]/form/div/div/div[1]/div/div[2]/button/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); //botão +
    console.log("3 - Tela Procurar anexo e clicando em procurar");
    //espera abrir tela Procurar Anexo
    //element = document.evaluate("/html/body/div[32]/div[2]/span/form[1]/div/div[1]/span/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); //procurar
    // até aqui OK

    // Cria um objeto de arquivo
    var myFile = new File(["C:\\Users\\willianmagalhaes\\Downloads\\Contas.pdf"], "Contas.pdf", {type: "application/pdf"}).click();
    // Seleciona o elemento de entrada de arquivo pelo seu ID
    //var input = document.getElementById("formAnexo:j_idt1752_input");
    //var fileInput = document.querySelector('input[type="file"]');

    // Define o arquivo selecionado no elemento de entrada de arquivo
    //input.files = file;
    //const dataTransfer = new DataTransfer();
    //dataTransfer.items.add(myFile);
    //fileInput.files = dataTransfer.files;
    //console.log(fileInput);
    //console.log(dataTransfer.files);
    //document.getElementById("form").submit();
    // Envia o formulário
    //document.getElementById("formAnexo:j_idt1752_input").submit();

});

button7.click(function() { //Abrir todos os anexos
    //document.evaluate("/html/body/div[7]/div/div/div[1]/form/button[2]/span[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); //botão anexar

    let count = 0;
    for (let i = 0; i <= 20; i++) {
        let id = `formOsAnexoBean:abasAtendimento:tableAtendimento:${i}:j_idt1738_menu`;
        let element = document.getElementById(id);
        if (element) {
            count++;
        }
    }

    for (var i = 0; i < count; i++) {
        setTimeout(function(i) {
            var id = "formOsAnexoBean:abasAtendimento:tableAtendimento:" + i + ":j_idt1741";
            var form = document.getElementById("formOsAnexoBean");
            form.target = "_blank";
            PrimeFaces.addSubmitParam('formOsAnexoBean', {[id]: id}).submit('formOsAnexoBean');
            //if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                //form.submit();
            //}
            console.log("i1: ",i);
        }, 500 * i, i);
    }

    let count2 = 0;
    for (let ii = 0; ii <= 20; ii++) {
        let id2 = `formOsAnexoBean:abasAtendimento:j_idt1742:${ii}:j_idt1748_menu`;
        let element2 = document.getElementById(id2);
        if (element2) {
            count2++;
        }
    }

    for (var ii = 0; ii < count2; ii++) {
        setTimeout(function(ii) {
            var id2 = "formOsAnexoBean:abasAtendimento:j_idt1742:" + ii + ":j_idt1749";
            var form2 = document.getElementById("formOsAnexoBean");
            form2.target = "_blank";
            PrimeFaces.addSubmitParam('formOsAnexoBean', {[id2]: id2}).submit('formOsAnexoBean');
            //if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                //form2.submit();
            //}
            console.log("i2: ",i);
        }, 500 * ii, ii);
    }

});

button8.click(async function() { //Usuario Orientado Vazamento

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var usuario = prompt('Digite o nome do usuario: ');

    var diag = ('Hidrômetro com bom funcionamento, leitura ' + leitura + ' confirmada, lacre ' + lacre + '. \nOrientamos o(a) usuário(a) ' + usuario + ' a verificar as instalações hidráulicas do imóvel, a fim de identificar qualquer vazamento que possa estar influenciando no faturamento. ')
    var prov = ('Caso seja encontrado um vazamento, é importante efetuar o registro fotográfico do local antes e depois da correção, além de providenciar o reparo imediato. \nApós o reparo, o usuário(a) deve encaminhar as fotos que comprovem a existência/correção do vazamento, juntamente com foto da numeração do hidrômetro e foto da leitura atual, para o e-mail agenciavirtual@caesb.df.gov.br, ou entrar em contato através da Central de Atendimento 115, para solicitar a abertura de uma Ordem de Serviço com uma das seguintes nomenclaturas: REVISAO CTA-CONS FAT-COM VIST ou CONFIRMAR CONSERTO DE VAZAMENTO, neste ultimo caso, o local do vazamento deve estar destampado/exposto. \nEssas medidas garantirão a revisão adequada das contas, conforme estabelecido pela Resolução 14/2011.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }

});

button9.click(async function() { //Portão fechado.

    var data = document.getElementById('form1:dataInicioExecucao_input').value;

    var diag = ('Comunicamos que em ' + data.split(' ')[0] + ' às ' + data.split(' ')[1] + ' a Caesb esteve em seu imóvel para realizar vistoria. Informamos que não foi possível, pois o imóvel estava fechado e não havia ninguém no local.');
    var prov = ('Deixado aviso de comparecimento.');

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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

    const tipoVazamento = await waitForElement('#form1\\:motivoNaoExecucao');
    console.log(tipoVazamento);

    if (tipoVazamento) {
        document.getElementById("form1:motivoNaoExecucao_8").click();
    }

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");
    //var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const improcedente = await waitForElement('#form1\\:j_idt512 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');

    if (improcedente !== null) {
        improcedente.click();
    }
});

button10.click(async function() { //Sem Vazam. Improcedente

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var usuario = prompt('Digite o nome do usuario: ');

    var diag = ('Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente e a leitura ' +leitura + ' foi confirmada. O lacre ' +lacre+ ' está intacto e não foi encontrado nenhum indício de vazamento no local. Diante disso, concluímos que as contas foram faturadas de acordo com o consumo registrado pelo hidrômetro.')
    var prov = ('Informamos que, de acordo com as normas e regulamentos vigentes, não há nenhuma prerrogativa para a concessão de desconto nesta situação relatada.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }
});

button11.click(async function() { //Vaz. Interno

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var usuario = prompt('Digite o nome do usuario: ');
    var vaz = prompt('Digite o local do vazamento: Ex. no ramal do quintal ');
    var vistoriante = prompt('Digite a matrícula do vistoriante: ');
    var conta = prompt('Digite a(s) conta(s): Ex. 01/2023, 02/2023 e 03/2023');

    var diag = ('Em vistoria o hidrômetro apresentou bom funcionamento, com leitura confirmada de ' + leitura + ', lacre ' + lacre + '. \nVazamento interno sanado, não visível e não coletado para o esgoto ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante)
    var prov = ('Conta(s) referência ' + conta + ' revisada(s) conforme Resolução ADASA nº 14/2011.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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


    const tipoVazamento = await waitForElement('#form1\\:tipoVazamento');
    console.log(tipoVazamento);

    if (tipoVazamento) {
        document.getElementById("form1:tipoVazamento_4").click();
    }


      // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }


});

button13.click(async function() { //Vaz Coberto

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var usuario = prompt('Digite o nome do usuario: ');

    var diag = ('Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente, leitura ' +leitura + ' foi confirmada e lacre ' +lacre+ '. Usuário informa que sanou vazamento, porém local já estava tampado/coberto, não sendo possível verificar o vazamento sanado.')
    var prov = ('A revisão de contas solicitada não pode ser concedida devido à falta de apresentação de documentação comprobatória do conserto do vazamento imperceptível e/ou da realização da vistoria para verificação do mesmo. \nConforme a Resolução 014/2011 da ADASA, para obter o desconto referido, o usuário deve apresentar o termo de ocorrência de eliminação do vazamento imperceptível e comprovantes do material/serviço executado para sanar o vazamento ou solicitar uma vistoria para reverificação do mesmo, desde que este esteja exposto para registro fotográfico ou encaminhar fotos do conserto juntamente com comprovantes para o e-mail agenciavirtual@caesb.df.gov.br.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }
});

button12.click(function() { //Leitura informada

    button1.click();
    var leitura = prompt('Digite a leitura: ');
    var conta = prompt('Digite a conta: Ex. 01/2023');

    var diag = ('Usuário informa leitura ' + leitura + ' para conta referência ' + conta + ' faturada pela média devido a ocorrência impeditiva de leitura.')
    var prov = ('Conta referência ' + conta + ' refaturada conforme leitura informada pelo usuário.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }
});

button14.click(async function() { //Erro de leitura

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var usuario = prompt('Digite o nome do usuario: ');
    var conta = prompt('Digite a(s) conta(s): Ex. 01/2023, 02/2023 e 03/2023');

    var diag = ('Hidrômetro com bom funcionamento, leitura ' +leitura+ ' confirmada, lacre ' +lacre+'. Houve erro de leitura.')
    var prov = ('Conta referência ' +conta+ ' refaturada conforme consumo do imóvel')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }
});

button15.click(async function() { //Agendamento de leitura

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var usuario = prompt('Digite o nome do usuario: ');
    var conta = prompt('Digite a conta: Ex. 01/2023');

    var diag = ('Hidrômetro com bom funcionamento, leitura ' +leitura+ ' confirmada, lacre ' +lacre+' . Vistoria de agendamento de leitura realizada para retirada de multa por impedimento de leitura.')
    var prov = ('Conta referência ' +conta+ ' refaturada conforme consumo do imóvel e retirada multa de impedimento de leitura.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }
});


button16.click(async function() { //Vazamento visível e coletado

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var vaz = prompt('Digite o local do vazamento: Ex. na caixa de descarga ');
    var vistoriante = prompt('Digite a matrícula do vistoriante: ');
    var usuario = prompt('Digite o nome do usuario: ');

    var diag = ('Hidrômetro com bom funcionamento, leitura ' +leitura+ ' confirmada, lacre ' +lacre+' . Vazamento interno sanado, visível e coletado para o esgoto ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante)
    var prov = ('Analisamos o seu pedido de revisão tarifária referente ao vazamento visível nas instalações hidráulicas da unidade usuária. Conforme a Resolução ADASA nº 14/2011, Art. 118, o desconto sobre o consumo excedente só é concedido quando houver constatação e subsequente eliminação de vazamento imperceptível nas instalações hidráulicas. Além disso, de acordo com o § 4º, se comprovado que o excesso de água não escoou para a rede pública de esgotos sanitários, a tarifa de esgoto será faturada com base na média de consumo da unidade usuária. Dessa forma, não é possível conceder desconto tanto na tarifa de água quanto na de esgoto, já que o vazamento era visível e a água escoou para a rede de esgoto.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }
});

button17.click(async function() { // Nº Hid não confere - já atualizado
    button1.click()
    var hid = document.querySelector("#form1\\:j_idt398_content > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4)").innerText;
    var data = document.querySelector("#form1\\:tbHidro_data > tr:nth-child(1) > td:nth-child(2)").innerText;
    var diag = ('Hidrômetro '+hid+' foi substituído pela CAESB e cadastro já está atualizado.');
    var prov = ('Hidrômetro instalado em ' + data);

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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

//     const tipoVazamento = await waitForElement('#form1\\:motivoNaoExecucao');
//     console.log(tipoVazamento);

//     if (tipoVazamento) {
//         document.getElementById("form1:motivoNaoExecucao_22").click();
//     }

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");
    //var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const improcedente = await waitForElement('#form1\\:j_idt512 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');

    if (improcedente !== null) {
        improcedente.click();
    }
});


button18.click(async function() { //Vaz.Negado Mais de 2 LS.

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var usuario = prompt('Digite o nome do usuario: ');
    var vaz = prompt('Digite o local do vazamento: Ex. no ramal do quintal ');
    var vistoriante = prompt('Digite a matrícula do vistoriante: ');
    var conta = prompt('Digite a(s) conta(s) que já receberam LS: Ex. 01/2023, 02/2023 e 03/2023');

    var diag = ('Em vistoria o hidrômetro apresentou bom funcionamento, com leitura confirmada de ' + leitura + ', lacre ' + lacre + '. \nVazamento interno sanado, não visível e não coletado para o esgoto ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante)
    var prov = ('Conforme ART. 118, §5º da resolução 014/2011 da ADASA o desconto será aplicado sobre não mais que duas faturas mensais subsequentes que comprovadamente sofreram influência do vazamento confirmado pelo prestador de serviços, limitado a duas ocorrências em um período de 12 (doze) meses.\n Revisão improcedente, já recebeu desconto por vazamento na(s) conta(s) ' +conta+ '. Atualizado vencimento da conta xx/2023.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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


    const tipoVazamento = await waitForElement('#form1\\:tipoVazamento');
    console.log(tipoVazamento);

    if (tipoVazamento) {
        document.getElementById("form1:tipoVazamento_4").click();
    }


      // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }


});

button19.click(async function() { // Reforço feito hoje
    button1.click()
    var data = document.getElementById('form1:j_idt449').value;
    var diag = ('OS principal baixada em ' + data + '.');

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
    if (element1 !== null) {
        element1.click();
    }
    if (element2 !== null) {
        element2.click();
    }
    if (element3 !== null) {
        element3.click();
    }

    const tipoVazamento = await waitForElement('#form1\\:motivoNaoExecucao');
    console.log(tipoVazamento);

    if (tipoVazamento) {
        document.getElementById("form1:motivoNaoExecucao_22").click();
    }

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    //var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }

    const improcedente = await waitForElement('#form1\\:j_idt512 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');

    if (improcedente !== null) {
        improcedente.click();
    }
});


button20.click(async function() { // Distribuição de Consumo

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
    const frase1 = `Houve acúmulo de consumo na conta referência ${lastRef} por ocorrência impeditiva nos ${previousMonths} meses anteriores.`;

    // Frase 2
    const firstRef = refsMatches[0];
    const frase2 = `Conta referência ${lastRef} refaturada pela distribuição do consumo dos meses ${firstRef} a ${lastRef}, com consumo total de ${totalVolume} em ${months} meses.`;

    //console.log(frase1); // Houve acúmulo de consumo na conta referência 03/2023 por ocorrência impeditiva nos 4 meses anteriores.
    //console.log(frase2); // Conta referência 03/2023 refaturada pela distribuição do consumo dos meses 11/2022 a 03/2023, com consumo total de 173m³ em 5 meses.

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var usuario = prompt('Digite o nome do usuario: ');

    var diag = ('Após vistoria no local, constatamos que o hidrômetro está funcionando corretamente, leitura ' +leitura + ' foi confirmada e o lacre ' +lacre+ ' está intacto. Não foi encontrado nenhum indício de vazamento no local. \n' + frase1);
    var prov = frase2;

    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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

    // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');

    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }

});


button21.click(async function() { // Vaz.Abaixo LS S/Esg

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre: ');
    var usuario = prompt('Digite o nome do usuario: ');
    var vaz = prompt('Digite o local do vazamento: Ex. no ramal do quintal ');
    var vistoriante = prompt('Digite a matrícula do vistoriante: ');
    var conta = prompt('Digite a(s) conta(s) que estão abaixo do LS: Ex. 01/2023, 02/2023 e 03/2023');

    var diag = ('Em vistoria o hidrômetro apresentou bom funcionamento, com leitura confirmada de ' + leitura + ', lacre ' + lacre + '. \nVazamento interno sanado, não visível ' + vaz + '.\nMatrícula vistoriante responsável pela avaliação: ' + vistoriante)
    var prov = ('Conforme ART. 118, §3º da resolução 014/2011 da ADASA o desconto na tarifa de água será no volume que ultrapassar o Limite Superior, sendo este 80% do consumo médio dos últimos 12 meses do imóvel. Conta(s) referência ' + conta + ' com consumo abaixo do Limite Superior.')

    // Get the elements by their xpath
    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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


    const tipoVazamento = await waitForElement('#form1\\:tipoVazamento');
    console.log(tipoVazamento);

    if (tipoVazamento) {
        document.getElementById("form1:tipoVazamento_4").click();
    }


      // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente) {
        improcedente.click()
    }

});

button22.click(async function() { // Troca de HD

    var leitura = prompt('Digite a leitura: ');
    var lacre = prompt('Digite o nº do lacre atual: ');
    var usuario = prompt('Digite o nome do usuario: ');
    var motivo = prompt('Digite o motivo da troca: (parado, danificado, etc)');
    var hdnovo = prompt('Digite o novo HIDRÔMETRO: (Y20S123456) ');
    var lacrenovo = prompt('Digite o novo LACRE: ');
    var hd = document.querySelector("#form1\\:j_idt398_content > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4)").innerText;

    var diag = ('Em vistoria verificamos que o hidrômetro ' + hd + ' está ' + motivo + ' com leitura ' + leitura + ' e lacre ' + lacre + '.');
    var prov = ('Hidrômetro substituído pelo ' + hdnovo + ', lacre ' + lacrenovo + ' e leitura 0.');

    var element1 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[2]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element2 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element3 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var element4 = document.evaluate("/html/body/div[8]/div/form[3]/span/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Check if the elements are found
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

      // Get the input fields by their id
    var diagn = document.getElementById("form1\:diagnosticoBaixa");
    var provd = document.getElementById("form1\:providenciaBaixa");

    // Check if the input fields are found
    if (diagn !== null) {
        diagn.value = diag;
    }
    if (provd !== null) {
        provd.value = prov;
    }

//     // Scroll to the button
//     $('html, body').animate({
//         scrollTop: $('#form1\\:tbHidro\\:0\\:j_idt631_button').offset().top
//     }, 1000);

//     // Click the button
//     var button = $('#form1\\:tbHidro\\:0\\:j_idt631_button');
//     button.trigger('mousedown');
//     button.trigger('mouseup');

    PrimeFaces.ab({s:'form1:tbHidro:0:j_idt634',p:'form1:tbHidro:0:j_idt634',u:'formSubstituicaoHidrometro',onco:function(xhr,status,args){PF('dlgSubstituicaoHidrometro').show();}});

    const sub = await waitForElement('#formSubstituicaoHidrometro\\:pnlHidAntigo_header > span:nth-child(1)');
    var nleit = document.getElementById("#formSubstituicaoHidrometro\\:j_idt1140");
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
        const nhd = await waitForElement('#formPesquisarHidrometro\\:j_idt1331');
        nhd.value = hdnovo;
        const pesq = document.evaluate("/html/body/div[22]/div[2]/form[1]/span/table/tbody/tr/td[2]/table/tbody/tr/td/button/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        const check = await waitForElement('/html/body/div[22]/div[2]/form[2]/div/div[2]/table/tbody/tr/td[9]/button/span[1]');
        check.click();
    }
    var leitn = document.getElementByID('#formSubstituicaoHidrometro\\:j_idt1155').value = 0;

    const usu = await waitForElement('#form1\\:j_idt508');
    const leit = await waitForElement('#form1\\:j_idt510');
    var improcedente = document.evaluate("/html/body/div[8]/div/form[3]/span/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/div[1]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (usu !== null) {
        usu.value = usuario;
    }
    if (leit !== null) {
        leit.value = leitura;
    }
    if (improcedente !== null) {
        improcedente.click()
    }

});


// Função que será chamada ao dar enter no campo de texto
function sliderHora(hora) {
    console.log("Entrou na função hora: " + hora + "h.");

    var data = new Date();
    const table = document.querySelector('.ui-datepicker-calendar');
    const activeDay = table.querySelector('.ui-state-active');
    const month = activeDay.parentElement.dataset.month;
    const year = activeDay.parentElement.dataset.year;
    const day = activeDay.textContent;

    const selectedDate = new Date(year, month, day);
    const currentDate = new Date();

    if (selectedDate.toDateString() === currentDate.toDateString()) {
        hora = 123 * hora / data.getHours();;
    } else {
        hora = 123 * hora / 23;
    }

    // Hora Inicio
    let sliderHandle = document.querySelector(".ui_tpicker_hour_slider");

    // simulate a mouse click and drag event on the slider handle to move it to 50%
    let event = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    event = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + hora,
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    event = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2) + (sliderHandle.parentElement.offsetWidth * 0.5),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);
    return
}

function sliderMinuto(minuto) {

    minuto = 123 * minuto / 59;


    // Minuto Inicio
    var sliderHandle = document.querySelector(".ui_tpicker_minute_slider");

    // simulate a mouse click and drag event on the slider handle to move it to 50%
    var event = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);

    event = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + minuto,
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);


    event = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        clientX: sliderHandle.getBoundingClientRect().left + (sliderHandle.offsetWidth / 2) + (sliderHandle.parentElement.offsetWidth * 0.5),
        clientY: sliderHandle.getBoundingClientRect().top + (sliderHandle.offsetHeight / 2)
    });
    sliderHandle.dispatchEvent(event);
    return
}

//Função de esperar por um elemento
async function waitForElement(selector) {
  return await new Promise(resolve => {
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(element);
      }
    }, 500);
  });
}
