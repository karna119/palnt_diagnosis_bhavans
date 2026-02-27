export async function POST(request) {
    return new Response(JSON.stringify({
        status: 'success',
        message: 'Minimal registration success'
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
