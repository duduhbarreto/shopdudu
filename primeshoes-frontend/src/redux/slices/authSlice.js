import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

// Função auxiliar para persistir o token no localStorage
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

// Thunk para login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/auth', credentials);
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || 'Falha ao fazer login';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk para registro
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/register', userData);
      toast.success('Cadastro realizado com sucesso! Por favor, faça o login.');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || 'Falha ao registrar';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk para buscar o perfil do usuário
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/users/show/me');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || 'Falha ao buscar perfil';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk para atualizar o perfil do usuário
export const update = createAsyncThunk(
  'auth/update',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch('/api/users', userData);
      toast.success('Perfil atualizado com sucesso!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || 'Falha ao atualizar perfil';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk para atualizar senha
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.patch('/api/users/password', { 
        currentPassword, 
        newPassword 
      });
      toast.success('Senha atualizada com sucesso!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || 'Falha ao atualizar senha';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Verifique se há um token no localStorage ao iniciar
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: token,
    isAuthenticated: !!token,
    loading: false,
    error: null,
    registerSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      setAuthToken(null);
    },
    clearError: (state) => {
      state.error = null;
    },
    resetRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // Após o login bem-sucedido, dispare fetchUserProfile para obter os dados do usuário
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Registro
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registerSuccess = false;
      })
      
      // Buscar perfil
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        setAuthToken(null);
      })
      
      // Atualizar perfil
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Atualizar senha
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, resetRegisterSuccess } = authSlice.actions;

// Seletor para verificar se o usuário está autenticado
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Seletor para obter o usuário atual
export const selectCurrentUser = (state) => state.auth.user;

// Seletor para verificar se há carregamento em andamento
export const selectAuthLoading = (state) => state.auth.loading;

// Seletor para verificar se há erro
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;