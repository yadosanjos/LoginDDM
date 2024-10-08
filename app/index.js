//importa componentes essenciais do react native para estrutura a tela de carregamento
import { View, Text, ActivityIndicatior } from 'react-native';
//importar reactpara criar componentes funcionais 
import React from 'react';

//função de componente que exibe uma tela inicial com um indicador de carregamento
export default function StartPage(){
    return(
        //view principal com estilo flexbox para centralizar o conteúdo da tela
        <View style={{flex: 1, justifyContent:'center'}}>
            {/* Exibe um indicador de atividade cirular mostrando ao usuário que algo está */}
            <ActivityIndicatior size="large" color="gray"/>
        </View>
    )
}
