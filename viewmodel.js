define(
[
	'plugins/http', 'durandal/app', 'knockoutBundle',
    'viewmodels/InventarioDeIdeias/NovaIdeia',
    'viewmodels/InventarioDeIdeias/Edicao'
],

function (
	http, app, ko,
    NovoBizu,
    Edicao
) {
    return function () {

        //Atributos --------------------------------------------------------------------------------------

        var self = this;


        //Search
        self.search = ko.observable();
        self.search.subscribe(function (value) {
            self.DoTheSearch(value);
        });

        //Ideias

        self.bizus = ko.observableArray([
            { codigo: '1',  id: '1', titulo: '#1 Numa matriz, ao ver muitos zeros, aplique Laplace', detalhe: ko.observable('Como o Laplace é um somatório de uma multiplicação envolvendo o elemento da matriz, é interessante pensar em aplicar quando há muitos zeros pois vai cair numa soma pequena'), bizuvisivel: ko.observable(false) },
            { codigo: '2', id: '1', titulo: '#2 Usar lei dos senos para cálculo de cordas', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '3', id: '1', titulo: '#3 Sempre explorar e manter simetria (trocar duas variáveis de lugar e nada mudar)', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '4', id: '1', titulo: '#4 Soma Telescópica : Somar diferenças consecutivas', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '5', id: '1', titulo: '#5 Num paralelogramo, as diagonais se cortam no meio', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '6', id: '1', titulo: '#6 Pra provar que medidas são iguais, usar congruência', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '7', id: '1', titulo: '#7 Provar somas constantes de medidas dentro de um triângulo, pensar em área', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },

            { codigo: '8',  id: '2', titulo: '#1 Em MRUV com V0=0 , os deslocamentos em intervalos de tempos iguais são proporcionais a 1:3:5:7:9:...', detalhe: ko.observable('(Gráfico) Como o deslocamento é a área do gráfico VxT , ...'), bizuvisivel: ko.observable(false) },
            { codigo: '9',  id: '2', titulo: '#2 Quando tiver duas lentes, soma suas vergências', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '10', id: '2', titulo: '#3 Em Sistemas conservativos, a energia se conserva', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '11', id: '2', titulo: '#4 Em questões de equilíbrio, a primeira coisa a se fazer é o diagrama de forças', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '12', id: '2', titulo: '#5 Quando não há forças externas, uma boa ideia é analisar o centro de massa do sistema', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '13', id: '2', titulo: '#6 Quando uma corda vibra no fundamental, depois vibra nos harmônicos', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '14', id: '2', titulo: '#7 Questões envolvendo distâncias e velocidades, é sempre bom pensar em gráfico vxt', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },

            { codigo: '15', id: '3', titulo: '#1 A cor do íon de Bromo é marrom', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '16', id: '3', titulo: '#2 PV=nRT', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) },
            { codigo: '17', id: '3', titulo: '#3 Pensar que o somatório do número de mols antes e depois é o mesmo', detalhe: ko.observable(''), bizuvisivel: ko.observable(false) }
        ]);

        self.questoesResolvidas = ko.observableArray([
            {bizuAssociado: '8', enunciado: 'Um corpo é abandonado do repouso e são tiradas fotos a partir do momento em que ele comela' , localizacao: 'Apostila 2 Assunto 4 Questao 2',idQuestao:14 },
            {bizuAssociado: '8', enunciado: 'Um corpo é abandonado do repouso e são tiradas fotos a partir do momento em que ele comela' , localizacao: 'Apostila 2 Assunto 4 Questao 2',idQuestao:15 },
            {bizuAssociado: '8', enunciado: 'Um corpo é abandonado do repouso e são tiradas fotos a partir do momento em que ele comela' , localizacao: 'Apostila 2 Assunto 4 Questao 2',idQuestao:16  }
        ]);

        //Disciplinas
      
        self.ideias = ko.observableArray([]);
        self.IdDisciplina = ko.observable();
        self.DefinirDisciplina = function (value) {

            self.ideias.removeAll();


            self.ideias($.grep(self.bizus(), function (e) {
                return e.id == value
            }));
        };
        self.activate = function () {
            self.ideias.removeAll();
            self.DefinirDisciplina(1);
        };
        //Edicao
        self.editarDetalhe = ko.observable(false);
        self.detalheEnunciado = ko.observable('');

        self.OcultarEdicaoDetalhe = function () {
            if (self.editarDetalhe() == true) self.editarDetalhe(false);
        };

        self.ExibirEdicaoDetalhe = function () {
            self.OcultarEdicaoDetalhe();
            self.editarDetalhe(true);
        };

        //self.CarregarEnunciado = function () {

        //    var retorno = 
        //    //return serviceBancoQuestoes.CarregarEnunciado(self.questaoRecebida().IdQuestao).then(function (retorno) {
        //    self.detalheEnunciado(retorno); 
        //    self.ProximoPasso();
        //    //});
        //};

        ko.bindingHandlers.ckEditor = {

            init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                var txtBoxID = $(element).attr("id");
                var options = allBindingsAccessor().richTextOptions || {};
                options.toolbar_Full = [
                    ['Source', '-', 'Format', 'Font', 'FontSize', 'TextColor', 'BGColor', '-', 'Bold', 'Italic', 'Underline', 'SpellChecker'],
                    ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'],
                    ['Link', 'Unlink', 'Image', 'Table']
                ];

                // handle disposal (if KO removes by the template binding)
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    if (CKEDITOR.instances[txtBoxID]) {
                        CKEDITOR.remove(CKEDITOR.instances[txtBoxID]);
                    }
                });

                // $(element).ckeditor(options);
                CKEDITOR.replace(txtBoxID);

                // wire up the blur event to ensure our observable is properly updated
                CKEDITOR.instances[txtBoxID].focusManager.blur = function () {
                    var observable = valueAccessor();
                    observable($(element).val());
                };
            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                var val = ko.utils.unwrapObservable(valueAccessor());
                $(element).val(val);
            }
        }

        //self.bizu = {
        //    titulo: ko.observable(),
        //    detalhe: ko.observable('Bizu detalhado'),
        //    bizuvisivel: ko.observable(false)
        //};


       
        




        self.DoTheSearch = function (valor) {
            // Declare variables
            var input, filter, ul, li, a, i;
            input = document.getElementById('myInput');
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName('li');

            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }

        self.tornadetalhevisivel = function (bizus) {
            if (bizus.bizuvisivel() == true) {
                bizus.bizuvisivel(false);
            } else {
                bizus.bizuvisivel(true);
            }
        }

        self.CriarNovoBizu = function (event) {
            var modal = new NovoBizu();
            modal.show().then(function () {
            });
        };

        self.EditarIdeia = function (obj) {
            var modal = new Edicao();
            modal.show().then(function () { });
        };
        
        self.usuario = ko.observable({
            IdUsuario: 0,
            Identificador: null
        });

        self.redes = ko.observableArray([]);
        self.idRede = ko.observable();
        self.idRede.subscribe(function (value) {
            self.escolas.removeAll();
            self.series.removeAll();
            self.AtualizarOpcoesDeFiltro();
        });

        self.escolas = ko.observableArray([]);
        self.idEscola = ko.observableArray([]);
        self.idEscola.subscribe(function (value) {
            self.series.removeAll();
            self.AtualizarOpcoesDeFiltro();
        });

        self.series = ko.observableArray([]);
        self.idSerie = ko.observableArray([]);
        self.idSerie.subscribe(function (value) {
            self.AtualizarOpcoesDeFiltro();
        });


        /*Listagens --------------------------------------------------------------------------------------

        self.BuscarDadosDoUsuario = function (event) {
            return serviceRelatoriosAtendimentos.BuscarDadosDoUsuario().then(function (response) {
                if (response) {
                    self.usuario({
                        IdUsuario: response[0].IdUsuario,
                        Identificador: response[0].Identificador
                    });
                }
                else { app.alerta('Não foi possível identificar o usuário. Favor refazer seu login.') }
            });
        };

        self.ListarRedes = function (event) {
            return serviceRelatoriosAtendimentos.ListarRedesRP(self.filtro()).then(function (retorno) {
                if (retorno) { self.redes(retorno); }
                else { self.AlertaDeFiltroVazio(); }
            });
        };

        self.ListarEscolas = function (event) {
            return serviceRelatoriosAtendimentos.ListarEscolas(self.filtro()).then(function (retorno) {
                if (retorno) {
                    self.escolas(retorno);
                    self.AtualizarOpcoesDeFiltro();
                }
                else { self.AlertaDeFiltroVazio(); }
            });
        };

        self.ListarSeries = function (event) {
            return serviceRelatoriosAtendimentos.ListarSeries(self.filtro()).then(function (retorno) {
                if (retorno) {
                    self.series(retorno);
                    self.AtualizarOpcoesDeFiltro();
                }
                else { self.AlertaDeFiltroVazio(); }
            });
        };

        //Exportação -------------------------------------------------------------------------------------

        self.ExportarRelatorio = function () {

            if (!self.PossuiValor(self.idRede())) {
                return app.alerta("Informe a rede.");
            }

            else if (self.DataInformadaEhValida(self.dataDe()) == false) {
                return app.alerta("A data inicial informada não é válida. Formato esperado: dd/mm/aaaa");
            }

            else if (self.DataInformadaEhValida(self.dataAte()) == false) {
                return app.alerta("A data inicial informada não é válida. Formato esperado: dd/mm/aaaa");
            }

            var url = 'Asp/RelatoriosAtendimentos/';

            if (self.tipoRelatorio() == 'presenca') { url = url + 'ExportacaoRelatorioPresenca.asp'; }
            else if (self.tipoRelatorio() == 'utilizacao') { url = url + 'ExportacaoRelatorioUtilizacao.asp'; }
            else if (self.tipoRelatorio() == 'utilizacaoprofessores') { url = url + 'ExportacaoRelatorioUtilizacaoProfessores.asp'; }
            else if (self.tipoRelatorio() == 'total') { url = url + 'ExportacaoRelatorioTotal.asp'; }
            else if (self.tipoRelatorio() == 'atendimentos' && self.atendimento() == 'Alunos') { url = url + 'ExportacaoRelatorioAtendimentos.asp'; }
            else if (self.tipoRelatorio() == 'atendimentos' && self.atendimento() == 'Responsáveis') { url = url + 'ExportacaoRelatorioAtendimentosResponsavel.asp'; }
            else if (self.tipoRelatorio() == 'ocorrencias') { url = url + 'ExportacaoRelatorioOcorrencias.asp'; }
            else { return app.alerta('Informe o tipo de relatório.'); }

            url = url + '?idUsuario=' + self.usuario().IdUsuario;
            url = url + '&identificador=' + self.usuario().Identificador;
            url = url + '&idRede=' + self.idRede();

            url = url + '&idEscola=';
            for (var i = 0; i < self.idEscola().length; i++) {
                if (i == 0) { url = url + self.idEscola()[i]; }
                else { url = url + ',' + self.idEscola()[i]; }
            }

            if (self.tipoRelatorio() != 'utilizacaoprofessores') {
                url = url + '&idSerie=';
                for (var i = 0; i < self.idSerie().length; i++) {
                    if (i == 0) { url = url + self.idSerie()[i]; }
                    else { url = url + ',' + self.idSerie()[i]; }
                }
            }

            if (self.PossuiValor(self.dataDe())) {
                url = url + '&dataDe=' + self.ExtrairData(self.dataDe());
            }

            if (self.PossuiValor(self.dataAte())) {
                url = url + '&dataAte=' + self.ExtrairData(self.dataAte());
            }

            if (self.tipoRelatorio() == 'utilizacao') {
                url = url + '&origem=' + self.relatorio();

            }

            window.location = url;
        };





        //Inicialização ----------------------------------------------------------------------------------

        self.BuscarDadosDoUsuario();*/


        self.PossuiValor = function (obj) {
            if ((obj == null) || (obj == 'undefined') || (obj == '') || (obj === undefined)) {
                return false;
            }
            else { return true; }
        };
    }

});
