//importa componentes do react native para estruturar a interface e interatividade
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';

//import react, hooks de estado e referencia para gerenciar os inputs e estado de carregamento
import React, { useRef, useState } from 'react';

//importa funções para criar layouts responsivos com base no tamanho da tela
import { widthPercentageToDP as wp, heihtPercentageToDP as hp } from "react-native-responsive-screen";

//importa o componente staturbar para controlar a barra de status
import { StatusBar } from 'expo-status-bar';

//importa icones do pacote expo , como ícone de email e cadeado para o input de senha
import { Octicons } from '@expo/vector-icons';

//importa icones do pacote expo , como ícone de email e cadeado para o input de senha
import { useRouter } from 'expo-router';

//importa componentes personalizados, com o carregamento (loading) e o gerenciamento de teclado customizado
import Loading from "../components/loading";
import CustomKeyboardView from '../components/CustomKeyboardView'

//importa o contexto de autenticação para gerenciar o login
import { useAuth } from '../context.authContext';

//função de componente para a tela de login
export default function SingIn(){
    //hoot de navegação para redirecionar o usuário após o login
    const router = useRouter();
    //useState para gerenciar o estado de carregamento (loading) enquanto o login é processado
    const [loading,setLoading] = useState(false);
    //hook de contexto de autenticação, que inclui a função de login
    const {login} = useAuth();

    //useRef cria referencias para os inputs de email e senha
    const emailRef = useRef("");
    const passwordRef = useRef("");

    //função que lida com o processo de login 
    const handleLogin = async () => {
        //verifica se os campos de email e senha estão preenchidos 
       if (!emailRef.current || !passwordRef.current){
         Alert.alert("Sing In", "Por favor, preencha todos os campo");
       }

       //Ativa o estado de carregamento e tenta fazer o login com os dados fornecidos
       setLoading(true);
       const response = await login(emailRef.current, passwordRef.current);
       setLoading(false);

       //Se o login falhar, exibe uma mensagem de erro
       if(!response.success) {
        Alert.alert('Sign In', response.msg);
       }
    }

    return(
        //View customatizado para ajustar o layout de teclado ao campo de entrada de texto
        <CustomKeyboardView>
            {/* statusbar para configurar o estilo da barra de status */}
            <StatusBar style="dark"/>
                <View style = {{paddingTop: hp(8), paddingHorizontal: wp(5)}} className = "flex-1 gap-12">
                    {/* exibe uma imagem de login no topo da tela */}
                   <View className ='items-center'>
                    <Image style={{height: hp (25)}} resizeMode='contain' source={} />
                   </View>

                   {/* Container dos campos de entrada e botão */}
                   <View className="gap-10">
                    {/* Titulo da tela de login */}
                     <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-800"> Sign In </Text>

                     {/* Campos de Entrada de Email  e senha */}
                     <View className="gap-4">
                        {/* campo de entrada de email */}
                        <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-x1">
                            <Octicons name="mail" size={hp(2.7)} color="gray"/>
                            <TextInput
                               onChangeText={value => emailRef.current = value}
                               style={{fontSize: hp(2)}}
                               className="flex-1 font-semibold text-neutral-700"
                               placeholder="Email address"
                               placeholderTextColor={'gray'} />
                        </View>

                        {/* campo de entrada de senha */}
                        <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-x1">
                            <Octicons name="mail" size={hp(2.7)} color="gray"/>
                            <TextInput
                               onChangeText={value => emailRef.current = value}
                               style={{fontSize: hp(2)}}
                               className="flex-1 font-semibold text-neutral-700"
                               placeholder="Password"
                               secureTextEntry
                               placeholderTextColor={'gray'} />
                        </View>
                        {/* Link para a funcionalidade de "esqueci a senha" */}
                          <Text style={{fontSize: hp(1.8)}} className="font-semibold text-right text-mestrual-500"> Esqueceu a senha? </Text>
                     </View>

                        {/* Botão de envio do formulario de login */}
                   </View>
                </View>
        </CustomKeyboardView>
    )
}