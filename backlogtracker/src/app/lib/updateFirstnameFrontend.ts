export async function UpdateFirstnameFrontend(userId: string, newName: string): Promise<{ success: boolean; message: string }> {
  // console.log(userId, " " , newName);
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