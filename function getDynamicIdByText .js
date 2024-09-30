/* const elements = document.querySelectorAll('[id^="' + 'formEnviarEmail\\:j_idt' + '"]');
let matchedIds = [];

for (const element of elements) {
        const id = element.id;
        const elementText = element.textContent.trim();

        if (id && elementText.includes('Diagnóstico)) {
            matchedIds.push({id, elementText});
        }
    }
console.log(matchedIds) */


function getDynamicIdByText(startingPattern, targetText, modif=0, targetIndex=0) {
    const elements = document.querySelectorAll('[id^="' + startingPattern + '"]');
    let matchedIds = [];

    for (const element of elements) {
        const id = element.id;
        const elementText = element.textContent.trim();

        if (id && elementText.includes(targetText)) {
            matchedIds.push({id, elementText});
        }
    }

    // Se targetIndex for -1, considera o último elemento
    if (targetIndex === -1) {
        targetIndex = matchedIds.length - 1;
    }

    if (targetIndex >= 0 && targetIndex < matchedIds.length) {
        const { id } = matchedIds[targetIndex];
        //console.log(id);
        if (modif != 0) {
            // Extrai o número do ID atual (assumindo que o formato é "j_idtNNN")
            let currentNumber = parseInt(id.match(/\d+$/)[0]);
            // Incrementa o número para obter o próximo número
            const nextNumber = currentNumber + modif;
            const regex = new RegExp("(\\d+)(?!.*\\d)");
            const idnew = id.replace(regex, nextNumber);
            return idnew;
        }
        return id;
    }

    return null; // Retorna null se nenhum elemento correspondente for encontrado no índice especificado
}

function formatCSSSelector(id) {
    if (id) {
        return '#' + id.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1");
    }
    return null;
}

function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (e) {
        console.error('Seletor inválido:', selector, e);
        return null; // Retorna null se o seletor for inválido
    }
}

function extractIds(tbodyidtID, mod) { // abas:formAtendimentoAnexo:j_idt656:0:j_idt662_menu
    let ids = {}; 
    const parts = tbodyidtID.split(':');
    const j_idtPart = parts.find(part => part.startsWith('j_idt'));
    if (j_idtPart) {
        const number = j_idtPart.match(/\d+/)[0];
        ids['prefix'] = parts.slice(0, parts.indexOf(j_idtPart) + 1).join(':');
        ids['menuId'] = parts[4];
        ids['abrir'] = 'j_idt' + (parseInt(number) + mod);
    }
    return ids;
}

/* // TELA DE REFATURAMENTO
var radioParcialID = getDynamicIdByText('form3:tableLancamento', 'TotalParcial', 0, 3);
var radioParcial = radioParcialID.split(':').pop();

var pfValorParcial = 'j_idt' + (parseInt(radioParcial.match(/\d+/)[0]) + 7);

// Botão de clicar em Cocessão de crédito (primeiro)
var pfDlgEdicaoShowID = getDynamicIdByText('j_idt', 'Cadastrar', 0);
var pfDlgEdicaoShow = pfDlgEdicaoShowID + ':' + 'j_idt' + (parseInt(pfDlgEdicaoShowID.match(/\d+/)[0]) + 2);

// Aplicação de crédito na tela de crédito
var contaRefSelectorID = getDynamicIdByText('form1\\:j_idt', 'Referência: *', 1); //ok
var contaRefSelector = formatCSSSelector(contaRefSelectorID);

var lupaSelectorID = getDynamicIdByText('form1\\:j_idt', 'Referência: *', 3); //ok 
var lupaSelector = formatCSSSelector(lupaSelectorID);

var AplicarCreditoButtID = getDynamicIdByText('form3\\:j_idt', 'Adicionar', 0); //ok
var AplicarCreditoButt = formatCSSSelector(AplicarCreditoButtID);

var observacaoinputID = getDynamicIdByText('form1\\:j_idt', 'Observação: *', 1); //ok
var observacaoinput = formatCSSSelector(observacaoinputID); */


/* const contaRefSelector = '#form1\\:j_idt473';
const lupaSelector = 'form1:j_idt475';
const AplicarCreditoButt = "#form3\\:j_idt692 > span.ui-button-text.ui-c";
const observacaoinput = '#form1\\:j_idt494';

// Identificadores usados nas chamadas PrimeFaces.ab()
const pfDlgEdicaoShow = "j_idt380:j_idt382";
const radioParcialID = "j_idt681";
const pfValorParcialID = ":j_idt688"; */


// GCOM NOVO!
/* var dataID = getDynamicIdByText('form\\:j_idt', 'Data do cadastro:');
var data = formatCSSSelector(dataID) + '_content';
console.log(data);
 */

/* const respostaID = getDynamicIdByText('form\\:j_idt', 'Encaminhar Carta Resposta:*', 1, -1); //ok
const diagnosticoID = getDynamicIdByText('form\\:j_idt', 'Diagnóstico*:', 1, -1); //ok 
const providenciaID = getDynamicIdByText('form\\:j_idt', 'Providência*:', 1, -1); //ok

resposta = (formatCSSSelector(respostaID) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');
diagnostico = formatCSSSelector(diagnosticoID);
providencia = formatCSSSelector(providenciaID); 

const vazcorrigidosimID = getDynamicIdByText('form\\:j_idt', 'Não se aplica',2,-1); //ok
const vazvisivelID = getDynamicIdByText('form\\:j_idt', 'Não se aplica',5,-1);
const vaznaovisivelID = getDynamicIdByText('form\\:j_idt', 'Não se aplica',5,-1); //ok
const vazcoletadoID = getDynamicIdByText('form\\:j_idt', 'Não se aplica',8,-1); //ok
const vaznaocoletadoID = getDynamicIdByText('form\\:j_idt', 'Não se aplica',8,-1); //ok

var vazcorrigidosim = (formatCSSSelector(vazcorrigidosimID) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');
var vazvisivel = (formatCSSSelector(vazvisivelID) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');
var vaznaovisivel = (formatCSSSelector(vaznaovisivelID) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');
var vazcoletado = (formatCSSSelector(vazcoletadoID) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');
var vaznaocoletado = (formatCSSSelector(vaznaocoletadoID) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');

console.log(vazcorrigidosim);
console.log(vazvisivel);
console.log(vaznaovisivel);
console.log(vazcoletado);
console.log(vaznaocoletado);



 

const checkemaildiagID = getDynamicIdByText('formEnviarEmail\\:j_idt', 'Diagnóstico', 3);
const checkemailprovID = getDynamicIdByText('formEnviarEmail\\:j_idt', 'Providência', 5);
const checkemailgerarID = getDynamicIdByText('formEnviarEmail\\:j_idt', 'Gerar texto do Email', 9);

var checkemaildiag = (formatCSSSelector(checkemaildiagID) + ' > div:nth-child(2) > span:nth-child(1)');
var checkemailprov = (formatCSSSelector(checkemailprovID) + ' > div:nth-child(2) > span:nth-child(1)');
var checkemailgerar = (formatCSSSelector(checkemailgerarID));

const nomeANEXO = getDynamicIdByText('formConfirmaAnexoVistoriaEmail\\:j_idt', 'Arquivo selecionado:');
const descricaoANEXO = getDynamicIdByText('formConfirmaAnexoVistoriaEmail\\:j_idt', 'Descrição do arquivo:*',1);

var elementPairs = [
    [formatCSSSelector(nomeANEXO) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', formatCSSSelector(descricaoANEXO)]
];

*/

const IrregConstID = getDynamicIdByText('form1\\:j_idt', 'Irregularidade Constatada*:', 1);
const IrregConst = formatCSSSelector(IrregConstID);

const ApuracaoID = getDynamicIdByText('form1\\:j_idt', 'Elemento de apuração da irregularidade*:', 1);
const Apuracao = formatCSSSelector(ApuracaoID);

const CriteriosID = getDynamicIdByText('form1\\:j_idt', 'Critérios adotados na revisão dos faturamentos*:', 1);
const Criterios = formatCSSSelector(CriteriosID);

const TarifaID = getDynamicIdByText('form1\\:j_idt', 'Tarifa utilizada*:', 1);
const Tarifa = formatCSSSelector(TarifaID);

const MemoCalculoID = getDynamicIdByText('form1\\:j_idt', 'Memória descritiva dos cálculos de revisão do valor faturado*:', 1);
const MemoCalculo = formatCSSSelector(MemoCalculoID);

console.log(IrregConst);
console.log(Apuracao);
console.log(Criterios);
console.log(Tarifa);
console.log(MemoCalculo);




//  ----------------------------

/* const nomeANEXOatendimentoOSC = getDynamicIdByText('formConfirmaAnexo\\:j_idt', 'Arquivo enviado:', -1);
const descricaoANEXOatendimentoOSC = getDynamicIdByText('formConfirmaAnexo\\:j_idt', 'Descrição: *');

const nomeANEXObaixaOSC = getDynamicIdByText('formConfirmaAnexo\\:j_idt', 'Arquivo enviado:');
const descricaoANEXObaixaOSC = getDynamicIdByText('formConfirmaAnexo\\:j_idt', 'Descrição: *', 1);

const nomeANEXObaixaATENDIMENTO = getDynamicIdByText('formConfirmaAnexoEmail\\:j_idt', 'Arquivo selecionado:');
const descricaoANEXObaixaATENDIMENTO = getDynamicIdByText('formConfirmaAnexoEmail\\:j_idt', 'Descrição do arquivo:', 1);

const nomeANEXOcliente = getDynamicIdByText('formClienteConfirmaAnexo', 'Arquivo selecionado:', 0, 1);
const descricaoANEXOcliente = '#formClienteConfirmaAnexo\\:descricaoArquivo';

const nomeANEXOclienteimovel = getDynamicIdByText('formConfirmaAnexo\\:j_idt', '', 0, 0);
const descricaoANEXOclienteimovel = getDynamicIdByText('formConfirmaAnexo\\:j_idt', 'Descrição do arquivo:', 1);

const nomeANEXOcadastro = getDynamicIdByText('formCadastroAnexo\\:j_idt', 'Arquivo:');
const descricaoANEXOcadastro = getDynamicIdByText('formCadastroAnexo\\:j_idt', 'Descrição:*', 1);

const elementPairs = [
    [formatCSSSelector(nomeANEXOatendimentoOSC) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', formatCSSSelector(descricaoANEXOatendimentoOSC)],
    [formatCSSSelector(nomeANEXObaixaOSC) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', formatCSSSelector(descricaoANEXObaixaOSC)],
    [formatCSSSelector(nomeANEXObaixaATENDIMENTO) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', formatCSSSelector(descricaoANEXObaixaATENDIMENTO)],
    [formatCSSSelector(nomeANEXOcliente) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', descricaoANEXOcliente],
    [formatCSSSelector(nomeANEXOclienteimovel) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', formatCSSSelector(descricaoANEXOclienteimovel)],
    [formatCSSSelector(nomeANEXOcadastro) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)', formatCSSSelector(descricaoANEXOcadastro)]
]

console.log(elementPairs);
 */

/* 
// Tela de abrir anexos na tela de baixa

// Anexos da OS
const anexoOSID = getDynamicIdByText('formOsAnexoBean:abasAtendimento:tableAtendimento:', 'Download', 0);
console.log(anexoOSID);
const idsOS = extractIds(anexoOSID, 3);
const prefix2 = 'formOsAnexoBean:abasAtendimento:tableAtendimento:';
const menuId2 = idsOS['menuId'];
const abrir2 = idsOS['abrir'];

console.log(prefix2);
console.log(menuId2);
console.log(abrir2);

// Anexos do atendimento
const anexoatendimentoID = getDynamicIdByText('formOsAnexoBean:abasAtendimento', 'Download', 0);
const idsAT = extractIds(anexoatendimentoID, 7);
const prefix1 = idsAT['prefix'];
const menuId1 = idsAT['menuId'];
const abrir1 = idsAT['abrir'];

console.log(prefix1);
console.log(menuId1);
console.log(abrir1);
 */


/* 
// Abrir anexos na tela de atendimento
const tbodyidtID = getDynamicIdByText('abas:formAtendimentoAnexo', 'Download', 0);
const ids = extractIds(tbodyidtID, 9); // modificador de +9 para o 'abrir'
const tbodyidt = (formatCSSSelector(ids['prefix']) + '_data');
const prefix3 = ids['prefix'];
const menuId3 = ids['menuId'];
const abrir3 = ids['abrir'];

const tbodyidtID2 = getDynamicIdByText('abas:formAtendimentoAnexo', 'Download', 0, -1); // ultimo elemento da lista
const ids2 = extractIds(tbodyidtID2, 7); // modificador de +9 para o 'abrir'
const tbodyidt2 = (formatCSSSelector(ids2['prefix']) + '_data');
const prefix4 = ids2['prefix'];
const menuId4 = ids2['menuId'];
const abrir4 = ids2['abrir'];


console.log(tbodyidt);
console.log(prefix3);
console.log(menuId3);
console.log(abrir3);

console.log(tbodyidt2);
console.log(prefix4);
console.log(menuId4);
console.log(abrir4);
 */

// const prefix3ID = getDynamicIdByText('abas:formAtendimentoAnexo:j_idt', 'Arquivo', 0);
// const menuId3ID = getDynamicIdByText('j_idt', 'Arquivo', 0);
// const abrir3ID = getDynamicIdByText('j_idt', 'Arquivo', 0);

/* 
// Exemplo de uso da função getDynamicIdByText
const contaTitleElementID = getDynamicIdByText('j_idt', 'Conta', 0);
const AttVencElementID = getDynamicIdByText('j_idt', 'Alterar Data Vencimento', 0);
const textarea2idtID = getDynamicIdByText('formVencimento\\:j_idt', 'Justificativa: *', 1);
const textareaidtID = getDynamicIdByText('formAlteracaoConta\\:j_idt', 'Justificativa: *', 1);
const leitidtID = getDynamicIdByText('formAlteracaoConta\\:j_idt', 'Leitura: *', 2);
const esgotomediaID = getDynamicIdByText('formAlteracaoConta:j_idt', 'Esgoto pela média?', 1);
const leituracriadanaoID = getDynamicIdByText('formAlteracaoConta:j_idt', 'Leitura Criada:', 1);

// Substitua os IDs hardcoded nos seletores por essas variáveis
const contaTitleElement = safeQuerySelector('#' + contaTitleElementID + '_title');
const AttVencElement = safeQuerySelector('#' + AttVencElementID + '_title');
const textarea2idt = formatCSSSelector(textarea2idtID);
const textareaidt = formatCSSSelector(textareaidtID);
const leitidt = formatCSSSelector(leitidtID);
const mediaesgoto = (formatCSSSelector(esgotomediaID) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');
const leituracriadanao = (formatCSSSelector(leituracriadanaoID) + ' > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)');


console.log('contaTitleElement: ' + contaTitleElement);
console.log('AttVencElement: ' + AttVencElement);
console.log('textarea2idt: ' + textarea2idt);
console.log('textareaidt: ' + textareaidt);
console.log('leitidt: ' + leitidt);
console.log('mediaesgoto: ' + mediaesgoto);
console.log('leituracriadanao: ' + leituracriadanao);


// CheckBox do enviar email resposta
const checkemail1ID = getDynamicIdByText('formEnviarEmail:', 'Diagnóstico', 3);
const checkemail2ID = getDynamicIdByText('formEnviarEmail:', 'Providência', 5);
const botaoemailID = getDynamicIdByText('formEnviarEmail:', 'Gerar texto do Email', 9);

const checkemail1 = (checkemail1ID + '_input');
const checkemail2 = (checkemail2ID + '_input');
const botaoemail = botaoemailID;

// Tela de Baixa - usuário, leitura e titulo de anexar.
const tagusuarioID = getDynamicIdByText('form1:', 'Acompanhou a OS: *', 1, 3);
const tagleituraID = getDynamicIdByText('form1:', 'Leitura do Hidrômetro: *', 1, 3);
const taganexarID = getDynamicIdByText('form1:', 'Anexos E-mail:', 0, 2);

const tagusuario = formatCSSSelector(tagusuarioID);
const tagleitura = formatCSSSelector(tagleituraID); 
const taganexar = (formatCSSSelector(taganexarID) + '_header');

console.log(tagusuarioID);
console.log(tagleituraID);
console.log(taganexarID);

console.log('checkemail1ID: ' + checkemail1ID);
console.log('checkemail1: ' + checkemail1);
console.log('checkemail2ID: ' + checkemail2ID);
console.log('checkemail2: ' + checkemail2);
console.log('botaoemailID: ' + botaoemailID);
console.log('botaoemail: ' + botaoemail);
console.log('tagusuarioID: ' + tagusuarioID);
console.log('tagusuario: ' + tagusuario);
console.log('tagleituraID: ' + tagleituraID);
console.log('tagleitura: ' + tagleitura);
console.log('taganexarID: ' + taganexarID);
console.log('taganexar: ' + taganexar);
 */


// Aplicação de crédito na tela de crédito
const contaRefSelectorID = getDynamicIdByText('form1:', 'Referência: *', 0);
const lupaSelectorID = getDynamicIdByText('form1:', '(mm/aaaa)', 0);

const contaRefSelector = formatCSSSelector(contaRefSelectorID);
const lupaSelector = formatCSSSelector(lupaSelectorID);


console.log('contaRefSelectorID: ' + contaRefSelectorID);
console.log('contaRefSelector: ' + contaRefSelector);
console.log('lupaSelectorID: ' + lupaSelectorID);
console.log('lupaSelector: ' + lupaSelector);
