export async function UpdatePasswordFrontend(userId: string, oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  try{
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