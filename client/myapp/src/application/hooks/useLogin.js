import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';


 

export const useLogin = ()=>{
     // const navigate = useNavigate();
       const queryClient = useQueryClient();
       const navigate = useNavigate('');

       const login = useMutation({
        mutationKey: ['user'],
        mutationFn: async({username,password})=>{
            const result = await authService.loging({ username, password })
        //    console.log("Result : ",result);
            return result;

        },
        onSuccess:(res)=>{
            if(res?.data?.user?.user_role==1) {
                      // queryClient.invalidateQueries({queryKey: ['myReservations']});
                     sessionStorage.setItem('usernameClient',res?.data?.user?.username);
                     sessionStorage.setItem('phoneNumberClient',res?.data?.user?.phoneNumber)
                     navigate('/stadiums/reserve');
            } 

            else if(res?.data?.user?.user_role==2) {
                console.log("yes");
      //          sessionStorage.setItem('token',res.data.token);
                sessionStorage.setItem('usernameManager',res?.data?.user?.username);
                navigate('/manager');
            }
            
         
        },
        onError:(err)=>{
            console.log('error is : ',err);
        }

     })

     return {
        login: login.mutateAsync,
     }
}