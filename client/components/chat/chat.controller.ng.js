'use strict'

angular.module('graficaExpresionApp')
    .controller('chatControll', function($scope,$meteor,$rootScope, $state) {

        $scope.chats = $meteor.collection(Chats, false).subscribe("chats");
        $scope.chat = {};
        $scope.saveChat = function(){
            $scope.chat.nombre = $scope.currentUser.profile.displayName;
            $scope.chat.imgPerfil = $scope.currentUser.profile.imgPerfil;
            Chats.insert($scope.chat,function(error,result){
                if(error){
                  //  $scope.msgAlerta(error,"error");

                }else if(result){
                    //$scope.msgAlerta("Msg Enviado.","success");
                    $scope.chat = {};
                }
            });
        };

        $scope.scrollBot = function(){
            $('#chats').scrollTop($('#chats')[0].scrollHeight);
        }
        $scope.msgAlerta = function(msg,tipo){
            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                theme: "future"
            }
            //Call
            Messenger().post({
                message:msg,
                showCloseButton: true,
                type: tipo
            });
        }
    });