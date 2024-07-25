export const axiosError = err => {
  if (err.response) {
    if (err.response.data.message) {
      alert(err.response.data.message)
    } else {
        alert('Request Decline')
    }
    if (err.response.status === 409 || err.response.status === 401) {
      setTimeout(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        // window.location.href = '/auth/sign-in'
      }, 200)
    }
    throw err
  } else if (err.request) {
    alert(err.message)
    throw err
  } else {
    alert(err.message)
    throw err
  }
}
