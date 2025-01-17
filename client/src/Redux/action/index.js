import axios from 'axios';


export const Register = (payload) => {
  return async (dispatch) => {
    const res = axios.post('http://localhost:3001/register', payload)
    const data = res.data

    return dispatch({
      type: "REGISTER",
      payload: data
    })

  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: response.data.token,
            role: response.data.role,
          },
        });

        return true; // Autenticación exitosa
      } else {
        throw new Error("Error durante el inicio de sesión.");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
      return false; // Autenticación fallida
    }
  };
};



// actions/authActions.js
export const loginSuccess = (token) => ({
  type: "LOGIN_SUCCESS",
  payload: token,
});
export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};


export const Users = () => {
  return async (dispatch) => {
    const res = axios.get('http://localhost:3001/users')
    const data = res.data

    return dispatch({
      type: "ALL_USERS",
      payload: data
    })

  }
}




export const DataPersonal = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/user', {
        method: "GET",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      dispatch({
        type: 'DATA_PERSONAL',
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener datos personales:", error);
      // Podrías dispatch una acción de error si es necesario
    }
  };
};

export const Coins = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/api/coins');

      const data = res.data;

      dispatch({
        type: 'ALL_COINS',
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener datos de la moneda digital:", error);
      // Podrías dispatch una acción de error si es necesario
    }
  };
};


export const ChangePriceCoins = (coinId, newPrice) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:3001/api/coins/update-price', {
        coinId,
        newPrice,
      });

      const data = res.data;

      dispatch({
        type: 'CHANGE_COINS',
        payload: data,
      });
    } catch (error) {
      console.error("Error al cambiar la moneda digital:", error);
      // Puedes dispatch una acción de error si es necesario
    }
  };
};

export const PaymentDeposite = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:3001/payment', payload);
      const data = res.data;

      dispatch({
        type: 'PAYMENT_DEPOSIT',
        payload: data,
      });
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      // Puedes dispatch una acción de error si es necesario
      dispatch({
        type: 'PAYMENT_ERROR',
        payload: { error: 'Error al procesar el pago' },
      });
    }
  };
};



