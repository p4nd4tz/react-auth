export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: {
                    'content-type': 'application/json'
                },
            })

            if (response.ok) {
                const data = await response.json()
                resolve({ data })
            } else {
                const error = await response.text();
                reject(error);
            }
        } catch (error) {
            reject(error)
        }
    })
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8000/auth/checkauth');
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }
  });
}

export function logout(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:4000/logout`)
            if (response.ok) {
                resolve({ data: 'success' })
            } else {
                const error = await response.text();
                reject(error);
            }
        } catch (error) {
            reject(error)
        }
    })
}