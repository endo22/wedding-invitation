import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for development
const wishes: Wish[] = [];

interface Wish {
  id: string;
  name: string;
  attendance: "yes" | "no";
  message: string;
  timestamp: string;
}

export async function GET() {
  try {
    // For development, return wishes from memory
    return NextResponse.json({
      wishes: wishes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json({ wishes: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, attendance, message } = await request.json();
    
    if (!name || !attendance || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new wish
    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance: attendance,
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    // Store in memory for development
    wishes.unshift(newWish);
    
    return NextResponse.json({ 
      success: true, 
      wish: newWish 
    });
  } catch (error) {
    console.error('Error saving wish:', error);
    return NextResponse.json(
      { error: 'Failed to save wish' },
      { status: 500 }
    );
  }
}
