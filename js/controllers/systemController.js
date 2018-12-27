/*Gera os graficos na pagina WEB*/
app.controller('systemCtrl', function($scope, systemService){
    
    let ctx = document.getElementById("myChart").getContext('2d');
    let ctxEst = [
        document.getElementById("myChartEstado1").getContext('2d'),
        document.getElementById("myChartEstado2").getContext('2d'),
        document.getElementById("myChartEstado3").getContext('2d'),
        document.getElementById("myChartEstado4").getContext('2d')
    
    ]
    let myChart = undefined // Utilizado para limpar os gráficos
    let myChartEstados = undefined;
    let estadoSelect = [];
    let dataSet = undefined;
    $scope.viewMapaBrasil = false;
    myChartEstadosVet = []

    limparGrafico = function(){ // Funcao para limpar a tela
        if(myChart != undefined){
            myChart.destroy();
        }
        
    }

 //Criando grafico de acidentes por UF
    $scope.gerarUF = function(){
        limparGrafico()
        limparMapBrasil()
        $scope.requisicao = true;
        systemService.getUf().
        then(function successCalback(response){
            $scope.requisicao = false;

            let option = {
                title: {
                   display: true,
                   fontSize: 28,
                   text: 'Número de acidentes por UF' //Titulo do grafico
               },
               tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        console.log(data)
                        return "O número de acidentes em "+ data.labels[tooltipItem.index] + " foi " + data.datasets[0].data[tooltipItem.index]; //legenda do grafico
                        
                    }
                }
               },
               legend: {
                display: true,
                position: 'bottom',
               },
               responsive: true
           }

            criaGrafico(response.data,'pie',option) //tipo de grafico, neste caso foi criado o grafico de pizza
        },
        function errorCallback(response){
            console.error('Erro ' + response);
        });
    } 


 //Criando grafico de acidentes por sexo
 $scope.gerarSexo = function(){ 
    limparGrafico()
    limparMapBrasil()
    $scope.requisicao = true;
    systemService.getSexo().
    then(function successCalback(response){
        $scope.requisicao = false;

            let option = {
                title: {
                   display: true,
                   fontSize: 28,
                   text: 'Número de acidentes por Sexo' //titulo do grafico
               },
               legend: {
                   display: true,
                   position: 'bottom',
       
               },
               responsive: true
           }
            
            criaGrafico(response.data,"doughnut",option) //tipo de grafico, neste caso foi criado o grafico de rosca
    },
    function errorCallback(response){
        console.error('Erro ' + response);
    });
} 

//Criando grafico de acidentes por Dia da Semana 
 $scope.gerarDia = function(){ 
    limparGrafico()
    limparMapBrasil()
    $scope.requisicao = true;
    systemService.getdia().
    then(function successCalback(response){
        $scope.requisicao = false;

            let option = {
                title: {
                   display: true,
                   fontSize: 28,
                   text: 'Número de acidentes por Dia' //titulo da pagina 
               },
               legend: {
                   display: false,
                   position: 'bottom',
       
               },
               responsive: true
           }

            criaGrafico(response.data,"bar",option) //tipo de grafico, neste caso foi criado o grafico de barra
    },
    function errorCallback(response){
        console.error('Erro ' + response);
    });
} 

//Cores randomicas nos graficos 
randomCor = function(numCor){
    let hexadecimais = '0123456789ABCDEF';
    let corRandom = '#';
    let arrayCores = [];
  
    // Pega um número aleatório no array acima
    while(numCor >= 0){
        for (let i = 0; i < 6; i++ ) {
            corRandom += hexadecimais[Math.floor(Math.random() * 16)];
        }
        arrayCores.push(corRandom)
        corRandom = '#'
        numCor--;
    }
    return arrayCores;
}

criaGrafico = function(acidente,tipoGrafico, options){
    let numArray = 0;
    let acidentesData = []
    let acidentesLabel = []
    
    for(ac in acidente){
        acidentesLabel.push(acidente[ac][0])
        acidentesData.push(acidente[ac][1])
        numArray++;
    }

        myChart = new Chart(ctx, {
            type: tipoGrafico,
            data: {
              labels: acidentesLabel,
              datasets: [{
                backgroundColor: randomCor(numArray),
                data: acidentesData
              }]
            },
            options: options
          });
        
   };

    //Criando grafico de acidentes por Estado - Mapa do Brasil
   $scope.gerarMapaBrasil = function(){
    limparGrafico()
    anychart.onDocumentReady(function() {
        // criar mapa do Brasil
        map = anychart.map();

        systemService.getUf().    
            then(function successCalback(response){
                // criar conjunto de dados
                dataSet = anychart.data.set([
                    {'id': 'BR.RS', 'value': 'Número de acidentes: ' + response.data[0][1], 'nome': 'Rio Grande do Sul'},
                    {'id': 'BR.PA', 'value': 'Número de acidentes: ' + response.data[1][1], 'nome': 'Pará'},
                    {'id': 'BR.ES', 'value': 'Número de acidentes: ' +  response.data[2][1], 'nome': 'Espiríto Santo'},
                    {'id': 'BR.AM', 'value': 'Número de acidentes: ' +  response.data[3][1], 'nome': 'Amazônia'},
                    {'id': 'BR.MT', 'value': 'Número de acidentes: ' +  response.data[4][1], 'nome': 'Mato Grosso'},
                    {'id': 'BR.MG', 'value': 'Número de acidentes: ' +  response.data[5][1], 'nome': 'Minas Gerais'},
                    {'id': 'BR.PR', 'value': 'Número de acidentes: ' +  response.data[6][1], 'nome': 'Paraná'},
                    {'id': 'BR.CE', 'value': 'Número de acidentes: ' +  response.data[7][1], 'nome': 'Ceará'},
                    {'id': 'BR.BA', 'value': 'Número de acidentes: ' +  response.data[8][1], 'nome': 'Bahia'},
                    {'id': 'BR.PI', 'value': 'Número de acidentes: ' +  response.data[9][1], 'nome': 'Piauí'},
                    {'id': 'BR.SP', 'value': 'Número de acidentes: ' +  response.data[10][1], 'nome': 'São Paulo'},
                    {'id': 'BR.AL', 'value': 'Número de acidentes: ' +  response.data[11][1], 'nome': 'Alagoas'},
                    {'id': 'BR.GO', 'value': 'Número de acidentes: ' +  response.data[12][1], 'nome': 'Goiás'},
                    {'id': 'BR.MS', 'value': 'Número de acidentes: ' +  response.data[13][1], 'nome': 'Mato Grosso do Sul'},
                    {'id': 'BR.SE', 'value': 'Número de acidentes: ' +  response.data[14][1], 'nome': 'Sergipe'},
                    {'id': 'BR.1099','value': 'Número de acidentes: ' +  response.data[15][1], 'nome': 'Acre'},
                    {'id': 'BR.PE', 'value': 'Número de acidentes: ' +  response.data[16][1], 'nome': 'Pernambuco'},
                    {'id': 'BR.DF', 'value': 'Número de acidentes: ' +  response.data[17][1], 'nome': 'Distrito Federal'},
                    {'id': 'BR.RJ', 'value': 'Número de acidentes: ' +  response.data[18][1], 'nome': 'Rio de Janeiro'},
                    {'id': 'BR.RR', 'value': 'Número de acidentes: ' +  response.data[19][1], 'nome': 'Roraima'},
                    {'id': 'BR.AP', 'value': 'Número de acidentes: ' +  response.data[20][1], 'nome': 'Amapá'},
                    {'id': 'BR.SC', 'value': 'Número de acidentes: ' +  response.data[21][1], 'nome': 'Santa Catarina'},
                    {'id': 'BR.153', 'value': 'Número de acidentes: ' +  response.data[22][1], 'nome': 'Rondônia'},
                    {'id': 'BR.PB', 'value': 'Número de acidentes: ' +  response.data[23][1], 'nome': 'Paraíba'},
                    {'id': 'BR.TO', 'value': 'Número de acidentes: ' +  response.data[24][1], 'nome': 'Tocantins'},
                    {'id': 'BR.RN', 'value': 'Número de acidentes: ' +  response.data[25][1], 'nome': 'Rio Grande do Norte'},
                    {'id': 'BR.MA', 'value': 'Número de acidentes: ' +  response.data[26][1], 'nome': 'Maranhão'},
                ]); 
                
                // criar series
                series = map.choropleth(dataSet);
            
                // contém propriedades dos dados geográficos
                series.geoIdField('id');
            
                // configurações das cores do mapa
                series.colorScale(anychart.scales.linearColor('#deebf7', '#3182bd'));
                series.hovered().fill('#addd8e');
                
                map.listen('pointClick', function(event) {
                    estadoSelect[0] = event.point.get('id')
                    estadoSelect[1] = event.point.get('nome')
                    $scope.limparGraficoEstados()
                    $('#modal1').modal('open');
                    gerarGraficosModal();
                    
                })

                // conjunto de dados geográficos
                // https://cdn.anychart.com/#maps-collection
                map.geoData(anychart.maps['brazil']);
                map.container('containerBR');
                map.draw();

            },
            function errorCallback(response){
                console.error('Erro ' + response);
            });
    });
    
   }

   gerarGraficosModal = function(){
        $scope.gerarSexoEstado();
    }

   // ESTADOS BRASIL GRÁFICOS MODAL
   $scope.limparGraficoEstados = function(num){
        for(index in myChartEstadosVet){
            myChartEstadosVet[index].destroy();
        }
        myChartEstadosVet = [];
    }

    limparMapBrasil = function(){
        document.getElementById('containerBR').innerHTML = ''
    }   

   criaGraficoEstados = function(acidente,tipoGrafico, options, num){
       console.log(acidente, num)
    let numArray = 0;
    let acidentesData = []
    let acidentesLabel = []
    
    for(ac in acidente){
        acidentesLabel.push(acidente[ac][0])
        acidentesData.push(acidente[ac][1])
        numArray++;
    }

        myChartEstados = new Chart(ctxEst[num], {
            type: tipoGrafico,
            data: {
              labels: acidentesLabel,
              datasets: [{
                backgroundColor: randomCor(numArray),
                data: acidentesData
              }]
            },
            options: options
          });

          myChartEstadosVet.push(myChartEstados)
        
   };
    //Criando grafico de acidentes por sexo em determinado Estado
   $scope.gerarSexoEstado = function(){ 
    //limparGraficoEstados()
    $scope.requisicaoEst = true;
    systemService.getSexoEstado(estadoSelect[0]).
    then(function successCalback(response){
        $scope.requisicaoEst = false;

            let option = {
                title: {
                   display: true,
                   fontSize: 28,
                   text: 'Número de acidentes por sexo no estado: ' + estadoSelect[1] //titulo da pagina adicionando o estado selecionado pelo usuario
               },
               legend: {
                   display: true,
                   position: 'bottom',
       
               },
               responsive: true
           }
            
            
            criaGraficoEstados(response.data,"pie",option, 0) //tipo de grafico, neste caso foi criado o grafico de pizza
            $scope.gerarBrEstado();
    },
    function errorCallback(response){
        console.error('Erro ' + response);
    });
}
//Criando grafico de acidentes por BR em determinado Estado
$scope.gerarBrEstado = function(){ 
    $scope.requisicaoEst = true;
    systemService.getBrEstado(estadoSelect[0]).
    then(function successCalback(response){
        $scope.requisicaoEst = false;

            let option = {
                title: {
                   display: true,
                   fontSize: 28,
                   text: 'Número de acidentes por BR no estado: ' + estadoSelect[1]  //titulo da pagina adicionando o estado selecionado pelo usuario
               },
               legend: {
                   display: true,
                   position: 'bottom',
       
               },
               responsive: true
           }
            criaGraficoEstados(response.data,"pie",option, 1) //tipo de grafico, neste caso foi criado o grafico de pizza
            $scope.gerarTop();
    },
    function errorCallback(response){
        console.error('Erro ' + response);
    });
}
//Criando grafico de acidentes Top 5 de cada Estado
$scope.gerarTop = function(){ 
    $scope.requisicaoEst = true;
    systemService.getTop(estadoSelect[0]).
    then(function successCalback(response){
        $scope.requisicaoEst = false;

            let option = {
                title: {
                   display: true,
                   fontSize: 28,
                   text: 'Número de acidentes por Município no estado: ' + estadoSelect[1]
               },
               legend: {
                   display: true,
                   position: 'bottom',
       
               },
               responsive: true
           }
            
            criaGraficoEstados(response.data,"pie",option, 2)
            $scope.gerarfisico();
    },
    function errorCallback(response){
        console.error('Erro ' + response);
    });
}
//Criando grafico de acidentes por Estado Fisico em determinado Estado
$scope.gerarfisico = function(){ 
    $scope.requisicaoEst = true;
    systemService.getfisico(estadoSelect[0]).
    then(function successCalback(response){
        $scope.requisicaoEst = false;

            let option = {
                title: {
                   display: true,
                   fontSize: 28,
                   text: 'Estado físico dos individuos acidentados no estado: ' + estadoSelect[1]  //titulo da pagina adicionando o estado selecionado pelo usuario
               },
               legend: {
                   display: true,
                   position: 'bottom',
       
               },
               responsive: true
           }
            
            criaGraficoEstados(response.data,"pie",option, 3) //tipo de grafico, neste caso foi criado o grafico de pizza
    },
    function errorCallback(response){
        console.error('Erro ' + response);
    });
}


})
