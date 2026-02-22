export interface RankUser {
  ranking: number;
  nickname: string;
  totalScore: string;
  profileImage: string | null;
  githubUrl: string | null;
  tier: {
    name: string;
    imageUrl: string;
  } | null;
}
