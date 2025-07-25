import { SteamUser } from "../../../../types/types";

export async function UpdateFirstnameFrontend(userId: string, newName: string): Promise<{ success: boolean; message: string }> {
  // api call to update first name
  try {
    const response = await fetch('/api/update-first-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, newName }),
    });

    if (response.ok) {
      return { success: true, message: 'First name updated successfully!' };
    } else {
      return { success: false, message: 'Failed to update first name' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred.' };
  }
}

export async function UpdateLastnameFrontend(userId: string, newName: string): Promise<{ success: boolean; message: string }> {
  try {
    // api call to update last name
    const response = await fetch('/api/update-last-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, newName }),
    });

    if (response.ok) {
      return { success: true, message: 'Last name updated successfully!' };
    } else {
      return { success: false, message: 'Failed to last name' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred.' };
  }
}

export async function UpdateEmailFrontend(userId: string, newEmail: string): Promise<{ success: boolean; message: string}> {
  try{
    // api call to update email
    const response = await fetch('/api/update-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, newEmail }),
    });

    if (response.ok) {
      return { success: true, message: 'Email updated successfully!' };
    } else {
      return { success: false, message: 'Failed up update email' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred'};
  }
}

export async function UpdatePasswordFrontend(userId: string, oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  try{
    // api call to the update-password
    const response = await fetch ('/api/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, oldPassword, newPassword }), 
    });

    if (response.ok){
      return { success: true, message: 'Password updated successfully' };
    } else {
      return { success: false, message: 'Failed to update password' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred.' };
  }
}

export async function DeleteAccountFrontend(userId: string): Promise<{ success: boolean; message: string}> {
  try{
    // api call to delete account
    const response = await fetch('/api/delete-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok){
      return { success: true, message: 'Account deleted successfully!' };
    } else {
      return { success: false, message: 'Failed to delete account' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred' };
  }
}

export async function DeleteSteamAccountFrontend(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    // api call to delete steam account
    const response = await fetch('/api/delete-steam-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      return { success: true, message: 'Steam linked account deleted successfully!' };
    } else {
      return { success: false, message: 'Failed to delete steam linked account'}
    }
  } catch (error) {
    return { success: false, message: 'An occured while deleting steam linked account' };
  }
}

export async function LoginFrontend(email: string, password: string): Promise <{ success: boolean; message: string }> {
  try {
    // api call to login
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Failed to login' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred' };
  }
}

export async function RegisterFrontend(firstName: string, lastName: string, email: string, password: string): Promise <{ success: boolean; message: string }> {
  try {
    // api call to register
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (response.ok) {
      return { success: true, message: 'Successful registering user' };
    } else {
      return { success: false, message: 'Error registering user' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred' };
  }
}

export async function VerifyUserTypeFrontend(userId: string): Promise<{ success: boolean; message: string; userType: string }> {
  try {
    // api call to verify user type
    const response = await fetch('/api/verify-user-type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      return {success: true, message: 'User Type verified', userType: (await response.json()).userType};
    } else {
      return { success: false, message: 'Failed to verify user type', userType: 'error' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred', userType: 'error' };
  }
} 

export async function FetchSteamUserDataFrontend(userId: string): Promise<{ success: boolean; message: string; userData: SteamUser | null }> {
  try {
    const response = await fetch('/api/fetch-steam-user-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Steam user data: ', data);
      return { success: true, message: 'steam user data found', userData: data.userData}
    } else {
      return { success: false, message: 'No steam user data found', userData: null };
    }
  } catch (error) {
    return { success: false, message: 'An error occured while fetching steam user data', userData: null };
  }
}