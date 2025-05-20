export async function UpdateLastnameFrontend(userId: string, newName: string): Promise<{ success: boolean; message: string }> {
  try {
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