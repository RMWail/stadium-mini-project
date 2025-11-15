import { adminService } from "../../services/adminService"
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { showError,showSuccess } from '../../../utility/sweetalert';

export const useAdmin =()=>{



    const assignMutation = useMutation({
        mutationKey: ['managers'],
        mutationFn: async(manager)=>{
        console.log("manager = ",manager);
            const res = await adminService.assigningManager(manager);
            console.log("response in useAdmin : ",res);
            return res;

        },
        onSuccess: (res) => {
          //  console.log("res in useAdmin : ",res)
            if(res.status ==200){
               showSuccess('successfull Assigning','Manager was assigned successfully');
            }
            else{
                showError('Assigning Failed','Something went wrong');
            }
        },
        onError: ()=>{  
           showError('Assigning Failed','Something went wrong');
        }
    })

    return {
        managerAssign : assignMutation.mutateAsync,
    }


}