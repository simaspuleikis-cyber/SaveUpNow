const BASE = '/api'

const q = (token) => `?token=${encodeURIComponent(token)}`

async function req(url, opts = {}) {
  const r = await fetch(url, opts)
  if (!r.ok) {
    const msg = await r.text().catch(() => r.statusText)
    throw new Error(msg)
  }
  return r.json()
}

export const apiAuth = (code) =>
  req(`${BASE}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })

export const apiGetUser       = (token) => req(`${BASE}/user${q(token)}`)
export const apiGetStats      = (token) => req(`${BASE}/stats${q(token)}`)
export const apiGetTxs        = (token) => req(`${BASE}/transactions${q(token)}`)
export const apiGetFriends    = (token) => req(`${BASE}/friends${q(token)}`)

export const apiUpdateUser = (token, update) =>
  req(`${BASE}/user${q(token)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  })

export const apiAddTx = (token, tx) =>
  req(`${BASE}/transactions${q(token)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tx),
  })

export const apiDeleteTx = (token, id) =>
  req(`${BASE}/transactions/${id}${q(token)}`, { method: 'DELETE' })

export const apiAddFriend = (token, friend) =>
  req(`${BASE}/friends${q(token)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(friend),
  })

export const apiDeleteFriend = (token, id) =>
  req(`${BASE}/friends/${id}${q(token)}`, { method: 'DELETE' })

export const apiUpdateFriendAmount = (token, id, amount) =>
  req(`${BASE}/friends/${id}/amount${q(token)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  })
