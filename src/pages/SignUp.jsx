import React, { useEffect, useState,useNavigate } from 'react';
import styled from "styled-components";
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

export default function SignUp() {


  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
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
    if (!formValues.name) newErrors.name = '이름을 입력해주세요!';
    if (!formValues.id) newErrors.id = '아이디를 입력해주세요!';
    if (!formValues.email) {
      newErrors.email = '이메일을 입력해주세요!';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = '이메일 형식에 맞게 다시 입력해주세요!';
    }
    if (!formValues.age) {
      newErrors.age = '나이를 입력해주세요!';
    } else if (isNaN(formValues.age)) {
      newErrors.age = '나이는 숫자로 입력해주세요!';
    } else if (formValues.age <= 0) {
      newErrors.age = '나이는 양수여야 합니다.!';
    } else if (!Number.isInteger(Number(formValues.age))) {
      newErrors.age = '나이를 실수로 입력할 수 없습니다.';
    } else if (formValues.age < 19) {
      newErrors.age = '19세 이상만 사용 가능합니다!';
    }
    if (!formValues.password) {
      newErrors.password = '비밀번호를 입력해주세요!';
    } else if (formValues.password.length < 4) {
      newErrors.password = '최소 4자리 이상 입력해주세요.';
    } else if (formValues.password.length > 12) {
      newErrors.password = '최대 12자리까지 가능합니다!';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formValues.password)) {
      newErrors.password = '비밀번호는 영어, 숫자, 특수문자를 포함해주세요.';
    }
    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = '비밀번호를 다시 입력해주세요!';
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다!';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    //1. 페이지 리로드 방지
    e.preventDefault();

    //back에 규격 맞춰서 회원가입 데이터 넘기기 성공하면 201띄우고, 알람
    axios
      .post('http://localhost:8080/auth/signup', {
        name: formValues.name,
        email: formValues.email,
        age: formValues.age,
        username: formValues.id,
        password: formValues.password,
        passwordCheck: formValues.confirmPassword,
      })
      .then((response) => {
        console.log('201', response.data);
                if (response.status === 201) {
          alert('회원가입이 정상적으로 처리 되었습니다');
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
          name="name"
          placeholder="이름을 입력해주세요"
          value={formValues.name}
          onChange={handleChanges}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <Input
          type="text"
          name='id'
          placeholder='아이디를 입력해주세요'
          value={formValues.id}
          onChange={handleChanges}
        />
        {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={formValues.email}
          onChange={handleChanges}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Input
          type="number"
          name="age"
          placeholder="나이를 입력해주세요"
          value={formValues.age}
          onChange={handleChanges}
        />
        {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}

        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={formValues.password}
          onChange={handleChanges}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formValues.confirmPassword}
          onChange={handleChanges}
        />
        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}

        <Button type="submit" disabled={!isFormValid}>제출하기</Button>
      </Form>
      <LinkContainer>
        이미 아이디가 있으신가요?
        <Link href="/login">로그인 페이지로 이동하기</Link>
      </LinkContainer>
    </PageContainer>
  );
}