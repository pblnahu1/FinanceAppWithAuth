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
          type="email"
          placeholder="Email"
          icon={
            <>
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </>
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Contraseña"
          icon={
            <>
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </>
          }
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
