import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ##22254b;
  color: white;
`;

const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 25px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  border: none;
  border-radius: 25px;
  background-color: white;
  color: #1a1a1a;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const LinkContainer = styled.div`
  margin-top: 20px;
  font-size: 14px;
`;

const Link = styled.a`
  color: white;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
`;

export default function LoginPage() {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
      });
    
      const [errors, setErrors] = useState({});
      const [isFormValid, setIsFormValid] = useState(false);
    
      useEffect(() => {
        const validationErrors = validate();
        setErrors(validationErrors);
        setIsFormValid(Object.keys(validationErrors).length === 0);
      }, [formValues]);
    
      const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
    
      const validate = () => {
        const newErrors = {};
        if (!formValues.username) newErrors.username = "아이디를 입력해주세요!"
        if (!formValues.password) {
          newErrors.password = '비밀번호를 입력해주세요!';
        } else if (formValues.password.length < 4) {
          newErrors.password = '최소 4자리 이상 입력해주세요.';
        } else if (formValues.password.length > 12) {
          newErrors.password = '최대 12자리까지 가능합니다!';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formValues.password)) {
          newErrors.password = '비밀번호는 영어, 숫자, 특수문자를 포함해주세요.';
        }
        return newErrors;
      };
    
      const handleSubmit = (e) => {
        //1. 페이지 리로드 방지
        e.preventDefault();
    
        //back에 규격 맞춰서 회원가입 데이터 넘기기 성공하면 201띄우고, 알람
        axios
          .post('http://localhost:8080/auth/login', {
            username: formValues.id,
            password: formValues.password,
          })
          .then((response) => {
            console.log('200', response.data);
                    if (response.status === 200) {
              alert('로그인이 정상적으로 처리 되었습니다');
              localStorage.setItem(response.data.token, response.data.username);
              //navigate('/signup/login');
            }
          })
          .catch((error) => console.log(error.response));
      };

      return (
        <PageContainer>
          <Title>회원가입 페이지</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              placeholder="아이디를 입력해주세요"
              value={formValues.username}
              onChange={handleChanges}
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}

            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={formValues.password}
              onChange={handleChanges}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
    
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
    
            <Button type="submit" disabled={!isFormValid}>제출하기</Button>
          </Form>
        </PageContainer>
      );
}
