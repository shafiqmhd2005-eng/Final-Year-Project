import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Get parameters from query string
  const heartRate = searchParams.get('heartRate');
  const temperature = searchParams.get('temperature');
  const systolic = searchParams.get('systolic');
  const diastolic = searchParams.get('diastolic');
  const cardiacOutput = searchParams.get('cardiacOutput');
  const oxygenSaturation = searchParams.get('oxygenSaturation');
  const respiratoryRate = searchParams.get('respiratoryRate');
  const ecg = searchParams.get('ecg');
  
  // Prepare response data
  const response = {
    timestamp: new Date().toISOString(),
    parameters: {
      heartRate: heartRate ? Number(heartRate) : null,
      temperature: temperature ? Number(temperature) : null,
      systolic: systolic ? Number(systolic) : null,
      diastolic: diastolic ? Number(diastolic) : null,
      cardiacOutput: cardiacOutput ? Number(cardiacOutput) : null,
      oxygenSaturation: oxygenSaturation ? Number(oxygenSaturation) : null,
      respiratoryRate: respiratoryRate ? Number(respiratoryRate) : null,
      ecg: ecg ? Number(ecg) : null
    },
    status: "received",
    message: "Heart data parameters received successfully"
  };
  
  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      heartRate,
      temperature,
      systolic,
      diastolic,
      cardiacOutput,
      oxygenSaturation,
      respiratoryRate,
      ecg
    } = body;
    
    // Validate required fields
    if (heartRate === undefined || temperature === undefined) {
      return NextResponse.json(
        { error: "Missing required heart parameters" },
        { status: 400 }
      );
    }
    
    // Process the heart data (in a real app, you'd save to database)
    const heartData = {
      heartRate: Number(heartRate),
      temperature: Number(temperature),
      systolic: systolic ? Number(systolic) : 120,
      diastolic: diastolic ? Number(diastolic) : 80,
      cardiacOutput: cardiacOutput ? Number(cardiacOutput) : 5.0,
      oxygenSaturation: oxygenSaturation ? Number(oxygenSaturation) : 98,
      respiratoryRate: respiratoryRate ? Number(respiratoryRate) : 16,
      ecg: ecg ? Number(ecg) : null,
      timestamp: new Date().toISOString()
    };
    
    // Log the received data
    console.log('❤️ Received heart data:', heartData);
    
    return NextResponse.json({
      success: true,
      message: "Heart data saved successfully",
      data: heartData
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error processing heart data:", error);
    return NextResponse.json(
      { error: "Failed to process heart data" },
      { status: 500 }
    );
  }
}
