"use server";

export async function uploadRouteImage(
  routeId: string,
  file: File
): Promise<void> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real app, this would upload the image to storage and update the route

  revalidatePath(`/routes/${routeId}`);
}

export async function deleteRouteImage(
  routeId: string,
  imageUrl: string
): Promise<void> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // In a real app, this would delete the image from storage and update the route

  revalidatePath(`/routes/${routeId}`);
}
