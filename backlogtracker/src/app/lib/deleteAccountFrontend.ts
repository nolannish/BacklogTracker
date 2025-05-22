export async function DeleteAccountFrontend(userId: string): Promise<{ success: boolean; message: string}> {
  try{
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