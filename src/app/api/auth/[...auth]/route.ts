import { NextResponse } from "next/server";
import { auth } from "@/lib/mock-db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // Ensure the request is JSON
    if (request.headers.get("content-type") !== "application/json") {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { action, ...data } = body;

    if (!action) {
      return NextResponse.json(
        { error: "Action is required" },
        { status: 400 }
      );
    }

    switch (action) {
      case "register": {
        try {
          const newUser = await auth.register(data);
          return NextResponse.json({ user: newUser }, { status: 201 });
        } catch (error) {
          console.error("Registration error:", error);
          return NextResponse.json(
            { error: "Registration failed" },
            { status: 400 }
          );
        }
      }

      case "login": {
        try {
          const { email, password } = data;
          if (!email || !password) {
            return NextResponse.json(
              { error: "Email and password are required" },
              { status: 400 }
            );
          }
          const user = await auth.login(email, password);
          if (!user) {
            return NextResponse.json(
              { error: "Invalid email or password" },
              { status: 401 }
            );
          }
          return NextResponse.json({ user });
        } catch (error) {
          console.error("Login error:", error);
          return NextResponse.json({ error: "Login failed" }, { status: 400 });
        }
      }

      case "logout": {
        try {
          await auth.logout();
          return NextResponse.json({ success: true });
        } catch (error) {
          console.error("Logout error:", error);
          return NextResponse.json({ error: "Logout failed" }, { status: 400 });
        }
      }

      case "getCurrentUser": {
        try {
          const currentUser = auth.getCurrentUser();
          return NextResponse.json({ user: currentUser });
        } catch (error) {
          console.error("Get current user error:", error);
          return NextResponse.json(
            { error: "Failed to get current user" },
            { status: 400 }
          );
        }
      }

      case "updateProfile": {
        try {
          const { userId, profileData } = data;
          if (!userId || !profileData) {
            return NextResponse.json(
              { error: "User ID and profile data are required" },
              { status: 400 }
            );
          }
          const updatedUser = await auth.updateProfile(userId, profileData);
          if (!updatedUser) {
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 }
            );
          }
          return NextResponse.json({ user: updatedUser });
        } catch (error) {
          console.error("Update profile error:", error);
          return NextResponse.json(
            { error: "Profile update failed" },
            { status: 400 }
          );
        }
      }

      case "updateRoles": {
        try {
          const { userId: roleUserId, roles } = data;
          if (!roleUserId || !roles) {
            return NextResponse.json(
              { error: "User ID and roles are required" },
              { status: 400 }
            );
          }
          const roleUpdatedUser = await auth.updateRoles(roleUserId, roles);
          if (!roleUpdatedUser) {
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 }
            );
          }
          return NextResponse.json({ user: roleUpdatedUser });
        } catch (error) {
          console.error("Update roles error:", error);
          return NextResponse.json(
            { error: "Role update failed" },
            { status: 400 }
          );
        }
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
