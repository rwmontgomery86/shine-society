import { validateLead } from "@/lib/validate";
import { UrableError, createOrUpdateUrableCustomer } from "@/lib/urable";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Bad request" },
      { status: 400 },
    );
  }

  if (
    body &&
    typeof body === "object" &&
    typeof (body as Record<string, unknown>).companyWebsite === "string" &&
    ((body as Record<string, string>).companyWebsite).trim() !== ""
  ) {
    return Response.json({ success: true, message: "Thanks!" }, { status: 200 });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return Response.json(
      {
        success: false,
        message: "Please check the highlighted fields.",
        errors: result.errors,
      },
      { status: 422 },
    );
  }

  try {
    const urable = await createOrUpdateUrableCustomer(result.data);
    return Response.json(
      { success: true, message: "Lead received.", id: urable.id ?? null },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof UrableError) {
      console.error("[lead] urable error", {
        status: err.status,
        body: err.body,
      });
    } else {
      console.error("[lead] unexpected error", err);
    }
    return Response.json(
      {
        success: false,
        message:
          "Something went wrong on our end. Please call 706-938-8694.",
      },
      { status: 502 },
    );
  }
}
