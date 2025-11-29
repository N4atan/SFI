import { useState } from "react";
import './LoginUser.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormularioSimples = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
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

        console.log(formData);
        
        try {
            const response = await axios.post('https://hackathon2025-0y0f.onrender.com/users/login', {...formData});
            console.log(response);

            localStorage.setItem('token-user', response.data.token)
            alert('Login Com Sucesso!');

            navigate('/nurse');

        } catch (e: unknown) {
            alert(e);
            console.error(e)
        }
        

        
        

    };

    return (
        <div className="container">
            <h1>Login Funcionário</h1>
            <form onSubmit={handleSubmit} className="simpleForm">
                
                <label htmlFor="username">Nome de Usuário</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={formData.username}
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

export default FormularioSimples;