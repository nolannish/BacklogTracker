export async function UpdateEmailFrontend(userId: string, newEmail: string): Promise<{ success: boolean; message: string}> {
  try{
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