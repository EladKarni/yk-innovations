import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify request is from Payload CMS (basic security)
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATION_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { collection, slug } = body;

    // Revalidate based on what was updated
    if (collection === 'projects' && slug) {
      revalidatePath(`/projects/${slug}`);
      revalidatePath('/projects');
      revalidatePath('/');
    } else if (collection === 'projects') {
      revalidatePath('/projects');
      revalidatePath('/');
    } else {
      // For global changes, revalidate everything
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
