"use client"
import  {useForm}  from "react-hook-form"

export default function ContactLang(){
  const {register} = useForm({mode: "onSubmit"})
    return(
        <form className="translationRoot_content__form">
      <table>
        <tbody className="translationRoot_content__form_tbody">
          <tr>
            <td colSpan={3}>
                <input {...register("asd")}/>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    )
}