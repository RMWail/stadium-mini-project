import { useState } from 'react'
import AdminLayout from '../Layout'
import { useAdmin } from '../../../application/hooks/admin/useAdmin';
import { isValidEmail, isValidUsername } from '../../../utility/formValidation';
import { confirmAction } from '../../../utility/sweetalert';


export default function managerManager (){
    const [manager, setManager] = useState({ managerUsername: '', managerEmail: '',managerPassword:'',managerConfirmPassword:'' });
    const [errors,setErrors] = useState([]);
    const emptyManager = ()=>{
        setManager({ managerUsername: '', managerEmail: '',managerPassword:'',managerConfirmPassword:'' });
    }

    const {managerAssign} = useAdmin();

    const domanager = async () => { 
      const validationErrors = {};

      console.log("username : ",manager.managerUsername)
       if(!isValidUsername(manager.managerUsername)){
        validationErrors.managerUsername = 'Invalid username';
       }

       if(!isValidEmail(manager.managerEmail)){
        validationErrors.managerEmail = 'Invalid email';
       }

       if(manager.managerPassword.length < 6){
        validationErrors.managerPassword = 'Password must be at least 6 characters';
       }

       if(manager.managerPassword !== manager.managerConfirmPassword){
        validationErrors.managerConfirmPassword = 'Passwords do not match';
       }

       setErrors(validationErrors);
       console.log(validationErrors);

       if(Object.keys(validationErrors).length == 0){
        confirmAction('Are you sure you want to assign new manager with this informations?','This action cannot be undone','warning').then(async(result)=>{
          if(result.isConfirmed){
            const res = await managerAssign(manager); 
            if(res.status==200){
              emptyManager();
            }
          }
        })
      }
    }

return (

<AdminLayout>
          <div className="adm__card">
            <h3>manager Manager</h3>
            <div className="adm__form">
{ /*             <label className="adm__field"><span>Stadium</span>
                <select value={manager.stadiumId} onChange={e=>setManager(a=>({ ...a, stadiumId: e.target.value }))}>
                  <option value="">Select...</option>
                  {(list||[]).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </label> */}
              <label className="adm__field">
                <span>Manager username</span>
                <input value={manager.managerUsername} onChange={e=>setManager(a=>({ ...a, managerUsername: e.target.value }))} placeholder="managerRahim2000" />
                {errors?.managerUsername && <span style={{color:'red'}}>{errors.managerUsername}</span>}
                </label>
              <label className="adm__field">
                <span>Manager email</span>
                <input value={manager.managerEmail} onChange={e=>setManager(a=>({ ...a, managerEmail: e.target.value }))} placeholder="manager@example.com" />
                 {errors?.managerEmail && <span style={{color:'red'}}>{errors.managerEmail}</span>}
                </label>
              <label className="adm__field">
                <span>Manager password</span>
                <input value={manager.managerPassword} onChange={e=>setManager(a=>({ ...a, managerPassword: e.target.value }))} type="password" />
                   {errors?.managerPassword && <span style={{color:'red'}}>{errors.managerPassword}</span>}
                </label>
              <label className="adm__field">
                <span>Manager confirm password</span>
                <input value={manager.managerConfirmPassword} onChange={e=>setManager(a=>({ ...a, managerConfirmPassword: e.target.value }))} type="password"/>
                   {errors?.managerConfirmPassword && <span style={{color:'red'}}>{errors.managerConfirmPassword}</span>}
                </label>

              <button className="adm__btn" onClick={domanager}>manager</button>
            </div>
          </div>
</AdminLayout>

)

}