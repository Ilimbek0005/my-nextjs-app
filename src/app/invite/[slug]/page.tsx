import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import InviteClientPage from "./InviteClientPage";
import { getEventInfo } from "../../actions/eventInfo";

export const dynamic = "force-dynamic";

interface InvitePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const resolvedParams = await params;

  const guest = await prisma.guest.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!guest) {
    notFound();
  }

  const wishes = await prisma.guest.findMany({
    where: { comment: { not: null } },
    select: { id: true, name: true, comment: true, respondedAt: true },
    orderBy: { respondedAt: "desc" },
  });

  const eventInfo = await getEventInfo();

  return (
    <InviteClientPage
      guest={guest}
      wishes={wishes}
      welcomeText={eventInfo.welcomeText}
      organizerName={eventInfo.organizerName}
    />
  );
}