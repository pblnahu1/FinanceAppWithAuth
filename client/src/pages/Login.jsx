/* eslint-disable react/prop-types */
import { InputField } from "../components";
import { useLogin } from "../hooks/useLogin";

const LoginPage = ({ handleStartLoginRegistroClick }) => {
  const { email, setEmail, password, setPassword, showPassword, isSubmitDisabled, errorMessage, handleTogglePassword, handleSubmit } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center m-0 lg:my-10">
      <h1 className="m-0 text-3xl font-bold md:text-5xl lg:m-5">
        Iniciar Sesión
      </h1>
      <span className="mb-5 text-center">
        La autenticación ahora se realiza contra el backend.
      </span>

      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

      <form
        className="flex flex-col items-center justify-center w-full md:w-2/5"
        onSubmit={handleSubmit}
      >
        <InputField
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          handleTogglePassword={handleTogglePassword}
        />

        <p>
          <a
            className="flex flex-col mt-4 mb-4 text-center cursor-pointer"
            onClick={handleStartLoginRegistroClick}
          >
            ¿No tenés una cuenta? ¡Registrate!
          </a>
        </p>

        <input
          type="submit"
          className="btn btn-wide btn-neutral"
          disabled={isSubmitDisabled}
        />
      </form>
    </div>
  );
};

export default LoginPage;
