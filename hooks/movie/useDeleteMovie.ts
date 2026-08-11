import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movidId: string) => {
      await axios.delete(`/api/movies/${movidId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};

export default useDeleteMovie;
