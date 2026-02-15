import Text from "@/components/common/Text/Text";

export type CategoryType = "git" | "linux" | "docker";

const CATEGORY_LABELS: Record<CategoryType, string> = {
  git: "Git",
  linux: "Linux",
  docker: "Docker",
};

interface CategoryProps {
  category: CategoryType;
}

export default function Category({ category }: CategoryProps) {
  return (
    <Text variant="body15" color="coolgrey_40">
      {CATEGORY_LABELS[category]}
    </Text>
  );
}
