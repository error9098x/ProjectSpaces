class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # Dictionary to count the frequency of each element in nums
        count = {}
        # List of empty lists to act as bins for elements by their frequency
        # Index i will hold elements that appear i times in nums
        freq = [[] for i in range(len(nums) + 1)]
        
        # First loop: Populate the count dictionary with element frequencies
        for n in nums:
            # Increment the frequency count for element n
            if n in count:
                count[n] += 1
            # Initialize the frequency count for element n
            else:
                count[n] = 1
        
        # Second loop: Use the frequency as an index to sort elements into bins
        # This is essentially a form of bucket sort
        for n, c in count.items():
            # Append element n to its corresponding frequency bin in freq
            freq[c].append(n)
        
        # Initialize the result list to store the top k frequent elements
        res = []
        # Iterate over freq in reverse order to access bins from highest frequency to lowest
        for i in range(len(freq) - 1, 0, -1):  # Ensure step is -1 to iterate backwards
            # Iterate over each element in the current bin (frequency)
            for j in freq[i]:
                # Add the current element to the result list
                res.append(j)
                # Check if we have collected k elements
                if len(res) == k:
                    # If k elements are collected, return the result
                    return res
