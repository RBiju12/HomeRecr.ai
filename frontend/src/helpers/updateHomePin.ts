export const updateHomePin = async (homeId: number, pinned: boolean) => {
  try {
    const response = await fetch(`/home/${homeId}/pins`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pinned }),
    });

    if (!response.ok) {
      throw new Error('Failed to update home pin');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
