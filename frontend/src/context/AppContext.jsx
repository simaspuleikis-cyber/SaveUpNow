import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import * as api from '../api'

const AppContext = createContext(null)

const initialState = {
  token:        localStorage.getItem('sun_token') || null,
  user:         null,
  transactions: [],
  friends:      [],
  stats:        null,
  view:         'auth',
  lang:         'en',
  dark:         false,
  toast:        null,   // { msg, type: 'success'|'error'|'info' }
  loading:      false,
  showAllTx:    false,
  showCode:     false,
  viewMode:     localStorage.getItem('sun_view_mode') || 'phone',  // 'phone' | 'desktop'
  // Skip landing/mode-select if the user already has a saved session
  appStage:     localStorage.getItem('sun_token') ? 'app' : 'landing',
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TOKEN':        return { ...state, token: action.token }
    case 'SET_USER':         return { ...state, user: action.user, lang: action.user?.lang || state.lang, dark: !!action.user?.dark_mode }
    case 'SET_TRANSACTIONS': return { ...state, transactions: action.transactions }
    case 'SET_FRIENDS':      return { ...state, friends: action.friends }
    case 'SET_STATS':        return { ...state, stats: action.stats }
    case 'SET_VIEW':         return { ...state, view: action.view }
    case 'SET_LANG':         return { ...state, lang: action.lang }
    case 'SET_DARK':         return { ...state, dark: action.dark }
    case 'SHOW_TOAST':       return { ...state, toast: { msg: action.msg, type: action.toastType || 'info' } }
    case 'CLEAR_TOAST':      return { ...state, toast: null }
    case 'SET_LOADING':      return { ...state, loading: action.loading }
    case 'SET_SHOW_ALL_TX':  return { ...state, showAllTx: action.showAllTx }
    case 'SET_SHOW_CODE':    return { ...state, showCode: action.showCode }
    case 'SET_VIEW_MODE':    return { ...state, viewMode: action.mode }
    case 'SET_APP_STAGE':   return { ...state, appStage: action.stage }
    case 'LOGOUT':
      localStorage.removeItem('sun_token')
      return { ...initialState, token: null, user: null, view: 'auth', appStage: 'landing' }
    default: return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const toastTimer = useRef(null)

  // ── Helpers ──────────────────────────────────────────────────────────────

  const showToast = useCallback((msg, type = 'info') => {
    dispatch({ type: 'SHOW_TOAST', msg, toastType: type })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3200)
  }, [])

  const navigate = useCallback((view) => {
    dispatch({ type: 'SET_VIEW', view })
  }, [])

  const toggleViewMode = useCallback(() => {
    const next = state.viewMode === 'phone' ? 'desktop' : 'phone'
    localStorage.setItem('sun_view_mode', next)
    dispatch({ type: 'SET_VIEW_MODE', mode: next })
  }, [state.viewMode])

  const setAppStage = useCallback((stage) => {
    dispatch({ type: 'SET_APP_STAGE', stage })
  }, [])

  // ── Data loading ─────────────────────────────────────────────────────────

  const loadData = useCallback(async (token) => {
    if (!token) return
    try {
      const [user, stats, transactions, friends] = await Promise.all([
        api.apiGetUser(token),
        api.apiGetStats(token),
        api.apiGetTxs(token),
        api.apiGetFriends(token),
      ])
      dispatch({ type: 'SET_USER', user })
      dispatch({ type: 'SET_STATS', stats })
      dispatch({ type: 'SET_TRANSACTIONS', transactions })
      dispatch({ type: 'SET_FRIENDS', friends })
      return user
    } catch (e) {
      showToast('Could not connect to backend. Is the server running?', 'error')
      return null
    }
  }, [showToast])

  // ── Auth ──────────────────────────────────────────────────────────────────

  const login = useCallback(async (code) => {
    dispatch({ type: 'SET_LOADING', loading: true })
    try {
      const { token, user } = await api.apiAuth(code)
      localStorage.setItem('sun_token', token)
      dispatch({ type: 'SET_TOKEN', token })
      dispatch({ type: 'SET_USER', user })
      await loadData(token)
      setAppStage('app')            // ensure we're always in app mode after login
      if (user.goal > 0) navigate('home')
      showToast('Welcome back!', 'success')
    } catch (e) {
      showToast(e.message || 'Login failed', 'error')
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false })
    }
  }, [loadData, navigate, showToast, setAppStage])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [])

  // ── User updates ──────────────────────────────────────────────────────────

  const updateUser = useCallback(async (update) => {
    if (!state.token) return
    try {
      const user = await api.apiUpdateUser(state.token, update)
      dispatch({ type: 'SET_USER', user })
      if (update.dark_mode !== undefined) {
        dispatch({ type: 'SET_DARK', dark: !!update.dark_mode })
      }
      return user
    } catch (e) {
      showToast(e.message, 'error')
      throw e
    }
  }, [state.token, showToast])

  // ── Transactions ──────────────────────────────────────────────────────────

  const addTransaction = useCallback(async (amount, note) => {
    if (!state.token) return
    try {
      const tx = await api.apiAddTx(state.token, {
        amount,
        note,
        date: new Date().toISOString(),
      })
      dispatch({ type: 'SET_TRANSACTIONS', transactions: [tx, ...state.transactions] })
      const stats = await api.apiGetStats(state.token)
      dispatch({ type: 'SET_STATS', stats })
      showToast(`+€${amount.toFixed(2)} saved!`, 'success')
      return tx
    } catch (e) {
      showToast(e.message, 'error')
      throw e
    }
  }, [state.token, state.transactions, showToast])

  const deleteTransaction = useCallback(async (id) => {
    if (!state.token) return
    try {
      await api.apiDeleteTx(state.token, id)
      dispatch({ type: 'SET_TRANSACTIONS', transactions: state.transactions.filter(t => t.id !== id) })
      const stats = await api.apiGetStats(state.token)
      dispatch({ type: 'SET_STATS', stats })
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [state.token, state.transactions, showToast])

  // ── Friends ──────────────────────────────────────────────────────────────

  const addFriend = useCallback(async (name) => {
    if (!state.token) return
    const amount = Math.round(Math.random() * 400 * 100) / 100
    try {
      const f = await api.apiAddFriend(state.token, { name, amount })
      dispatch({ type: 'SET_FRIENDS', friends: [...state.friends, f] })
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [state.token, state.friends, showToast])

  const deleteFriend = useCallback(async (id) => {
    if (!state.token) return
    try {
      await api.apiDeleteFriend(state.token, id)
      dispatch({ type: 'SET_FRIENDS', friends: state.friends.filter(f => f.id !== id) })
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [state.token, state.friends, showToast])

  const randomizeFriends = useCallback(async () => {
    if (!state.token) return
    try {
      await Promise.all(
        state.friends.map(f => {
          const amount = Math.round(Math.random() * 500 * 100) / 100
          return api.apiUpdateFriendAmount(state.token, f.id, amount).then(() =>
            ({ ...f, amount })
          )
        }).map(async (p) => {
          const updated = await p
          return updated
        })
      )
      const friends = await api.apiGetFriends(state.token)
      dispatch({ type: 'SET_FRIENDS', friends })
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [state.token, state.friends, showToast])

  // ── Dark mode sync ────────────────────────────────────────────────────────

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.dark ? 'dark' : 'light')
  }, [state.dark])

  // ── Bootstrap ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (state.token) {
      loadData(state.token).then((user) => {
        if (user) {
          // Ensure we always end up in app mode for returning users
          setAppStage('app')
          if (user.goal > 0) navigate('home')
        } else {
          // Token is invalid / backend unreachable — send to auth
          navigate('auth')
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    state, dispatch,
    showToast, navigate, login, logout,
    updateUser, loadData,
    addTransaction, deleteTransaction,
    addFriend, deleteFriend, randomizeFriends,
    toggleViewMode, setAppStage,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
