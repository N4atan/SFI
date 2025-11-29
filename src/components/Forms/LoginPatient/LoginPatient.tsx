import { useState } from "react";
import './LoginPatient.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormularioSimplesLoginPatient = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        uuid: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('https://hackathon2025-0y0f.onrender.com/patient/login', {...formData});

            console.log(response);

            localStorage.setItem('token-patient', response.data.token)
            alert('Login Com Sucesso!');

            // Navegar para a tela do card dele;
            
        } catch (e: unknown) {
            alert(e);
            console.error(e)
        }
    };

    return (
        <div className="container">
            <h1>Login Paciente</h1>
            <form onSubmit={handleSubmit} className="simpleForm">
                
                <label htmlFor="uuid">Identificador do Paciente</label>
                <input 
                    type="text" 
                    id="uuid" 
                    name="uuid" 
                    value={formData.uuid}
                    onChange={handleChange}
                    required 
                />
                
                
                <label htmlFor="senha">Senha</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                />
                

                <button type="submit" className="submitButton">
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default FormularioSimplesLoginPatient;