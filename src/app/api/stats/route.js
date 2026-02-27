export async function GET() {
    return new Response(JSON.stringify({
        total_predictions: 1240,
        top_plant: "Tomato",
        status: "Online",
        source: "minimal-stats"
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
