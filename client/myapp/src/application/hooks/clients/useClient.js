import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { clientService } from '../../services/clientService';
import { showError,showSuccess } from '../../../utility/sweetalert';

export const useClient = ()=>{

    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationKey: ['clients'],
        mutationFn: async(client)=>{
                console.log("client = ",client);
                const res = await clientService.register(client);
                return res;
        },
        onSuccess: (res) => {
            console.log("res in uerRegister : ",res)
            if(res.status ==200){
               showSuccess('Account created','You can now login to your account');
                navigate('/login');
            }
            else{
                showError('Register Failed','Something went wrong');
            }
        },
        onError: ()=>{  
           showError('Register Failed','Something went wrong');
        }
    })

   const {data,isLoading,isError} = useQuery({
        queryKey: ['myReservations'],
        queryFn: async()=>{
            const response = await clientService.myReservations(sessionStorage.getItem('usernameClient'));
            if(response.status != 200) {
                throw new Error(response.message || 'Error during fetching client reservations');
            }

            const today = new Date();
            const upcoming = [];
            const past = [];
            
            for(let i=0;i<response.data.length;i++){
                const reservationDate = new Date(response.data[i].date);
                if(reservationDate < today){
                    if(response.data[i].status ==0){
                  // response.data[i].status = -1;
                    }
                    past.push(response.data[i]);
                }
                else{
                   // response.data[i].status = 1;
                    upcoming.push(response.data[i]);
                }
            }

            //console.log('response :',response.data);
            return {upcoming:upcoming,past:past};
        },
        staleTime:Infinity,
    })
    
    return {
        myReservations: data || {upcoming : [],past: []},
        isLoading,
        isError,
        register : registerMutation.mutateAsync, 
    }
    }